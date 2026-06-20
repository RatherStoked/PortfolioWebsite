"use client";
import { useState, useEffect, useCallback } from "react";
import { Project, Article, Profile } from "@/types";

const EMPTY_PROJECT: Omit<Project, "id"> = {
  title: "", description: "", imageUrl: "", date: "", body: "", images: [], link: "",
};
const EMPTY_ARTICLE: Omit<Article, "id"> = { title: "", date: "", link: "" };

function hdrs(pw: string) {
  return { "Content-Type": "application/json", "x-admin-key": pw };
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs text-gray-400 mb-1 font-mono">{children}</label>
);

const Input = (p: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...p} className={`w-full border rounded px-2 py-1 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-gray-300 ${p.className ?? ""}`} />
);

const Textarea = (p: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...p} className={`w-full border rounded px-2 py-1 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none ${p.className ?? ""}`} />
);

type BtnVariant = "default" | "danger" | "primary";
const Btn = ({ onClick, children, variant = "default", disabled }: {
  onClick?: () => void; children: React.ReactNode; variant?: BtnVariant; disabled?: boolean;
}) => {
  const c = variant === "danger" ? "text-red-400 border-red-200 hover:bg-red-50"
          : variant === "primary" ? "text-black border-gray-400 hover:bg-gray-50"
          : "text-gray-500 border-gray-200 hover:bg-gray-50";
  return (
    <button onClick={onClick} disabled={disabled}
      className={`border text-xs rounded py-1 px-2 font-mono transition ${c} disabled:opacity-40`}>
      {children}
    </button>
  );
};

function ProjectForm({ initial, onSave, onCancel, loading }: {
  initial: Omit<Project, "id"> & { id?: number };
  onSave: (d: Omit<Project, "id"> & { id?: number }) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [f, setF] = useState(initial);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="border rounded p-4 mt-2 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><Label>Title</Label><Input value={f.title} onChange={set("title")} placeholder="Project name" /></div>
        <div><Label>Date</Label><Input value={f.date} onChange={set("date")} placeholder="2025 - present" /></div>
        <div className="sm:col-span-2"><Label>Description (card preview)</Label><Input value={f.description} onChange={set("description")} /></div>
        <div className="sm:col-span-2"><Label>Body (modal write-up)</Label><Textarea rows={5} value={f.body} onChange={set("body")} /></div>
        <div><Label>Cover image path</Label><Input value={f.imageUrl} onChange={set("imageUrl")} placeholder="/images/project.png" /></div>
        <div>
          <Label>Gallery images (comma-separated)</Label>
          <Input
            value={f.images.join(", ")}
            onChange={e => setF(p => ({ ...p, images: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))}
            placeholder="/images/a.png, /images/b.png"
          />
        </div>
        <div className="sm:col-span-2"><Label>External link</Label><Input value={f.link} onChange={set("link")} placeholder="https://..." /></div>
      </div>
      <div className="flex gap-2 mt-3">
        <Btn variant="primary" onClick={() => onSave(f)} disabled={loading}>{loading ? "Saving…" : "Save"}</Btn>
        <Btn onClick={onCancel}>Cancel</Btn>
      </div>
    </div>
  );
}

function ArticleForm({ initial, onSave, onCancel, loading }: {
  initial: Omit<Article, "id"> & { id?: number };
  onSave: (d: Omit<Article, "id"> & { id?: number }) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [f, setF] = useState(initial);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="border rounded p-4 mt-2 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2"><Label>Title</Label><Input value={f.title} onChange={set("title")} /></div>
        <div><Label>Date (YYYY-MM-DD)</Label><Input value={f.date} onChange={set("date")} placeholder="2024-01-15" /></div>
        <div className="sm:col-span-3"><Label>Link</Label><Input value={f.link} onChange={set("link")} placeholder="https://medium.com/..." /></div>
      </div>
      <div className="flex gap-2 mt-3">
        <Btn variant="primary" onClick={() => onSave(f)} disabled={loading}>{loading ? "Saving…" : "Save"}</Btn>
        <Btn onClick={onCancel}>Cancel</Btn>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authErr, setAuthErr] = useState(false);
  const [password, setPassword] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileDraft, setProfileDraft] = useState<Profile | null>(null);

  const [editProject, setEditProject] = useState<(Omit<Project, "id"> & { id?: number }) | null>(null);
  const [editArticle, setEditArticle] = useState<(Omit<Article, "id"> & { id?: number }) | null>(null);
  const [editProfile, setEditProfile] = useState(false);

  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const flash = (msg: string) => { setStatus(msg); setTimeout(() => setStatus(""), 2500); };

  const load = useCallback(async (p: string) => {
    const h = hdrs(p);
    const [pr, ar, pfr] = await Promise.all([
      fetch("/api/projects", { headers: h }),
      fetch("/api/articles", { headers: h }),
      fetch("/api/profile",  { headers: h }),
    ]);
    setProjects(await pr.json());
    setArticles(await ar.json());
    const pf = await pfr.json();
    setProfile(pf);
    setProfileDraft(pf);
  }, []);

  async function handleAuth() {
    const res = await fetch("/api/profile", { headers: hdrs(pw) });
    if (res.ok) { setPassword(pw); setAuthed(true); setAuthErr(false); load(pw); }
    else setAuthErr(true);
  }

  async function saveProject(data: Omit<Project, "id"> & { id?: number }) {
    setLoading(true);
    await fetch("/api/projects", { method: data.id ? "PUT" : "POST", headers: hdrs(password), body: JSON.stringify(data) });
    await load(password); setEditProject(null); flash("Saved ✓"); setLoading(false);
  }
  async function deleteProject(id: number) {
    if (!confirm("Delete?")) return;
    await fetch("/api/projects", { method: "DELETE", headers: hdrs(password), body: JSON.stringify({ id }) });
    await load(password); flash("Deleted ✓");
  }
  async function handleReorder(fromIdx: number, toIdx: number) {
    if (fromIdx === toIdx) return;
    const reordered = [...projects];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    setProjects(reordered);
    await fetch("/api/projects", { method: "PATCH", headers: hdrs(password), body: JSON.stringify({ projects: reordered }) });
    flash("Order saved ✓");
  }

  async function saveArticle(data: Omit<Article, "id"> & { id?: number }) {
    setLoading(true);
    await fetch("/api/articles", { method: data.id ? "PUT" : "POST", headers: hdrs(password), body: JSON.stringify(data) });
    await load(password); setEditArticle(null); flash("Saved ✓"); setLoading(false);
  }
  async function deleteArticle(id: number) {
    if (!confirm("Delete?")) return;
    await fetch("/api/articles", { method: "DELETE", headers: hdrs(password), body: JSON.stringify({ id }) });
    await load(password); flash("Deleted ✓");
  }

  async function saveProfile() {
    if (!profileDraft) return;
    setLoading(true);
    await fetch("/api/profile", { method: "PUT", headers: hdrs(password), body: JSON.stringify(profileDraft) });
    setProfile(profileDraft); setEditProfile(false); flash("Saved ✓"); setLoading(false);
  }

  useEffect(() => { /* load called after auth */ }, [load]);

  if (!authed) return (
    <div className="font-mono border rounded-lg p-4 fixed top-10 left-10 right-10 bottom-10 flex items-center justify-center">
      <div className="w-72">
        <p className="text-xs text-gray-400 mb-1">mattstokes.xyz / admin</p>
        <h1 className="font-bold text-2xl mb-6">CMS</h1>
        <Label>Password</Label>
        <Input type="password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleAuth()} autoFocus />
        {authErr && <p className="text-xs text-red-400 mt-1">Wrong password</p>}
        <div className="mt-3"><Btn variant="primary" onClick={handleAuth}>Enter →</Btn></div>
      </div>
    </div>
  );

  return (
    <div className="font-mono border rounded-lg p-6 fixed top-10 left-10 right-10 bottom-10 overflow-y-scroll">

      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <p className="text-xs text-gray-400">mattstokes.xyz / admin</p>
          <h1 className="font-bold text-2xl">CMS</h1>
        </div>
        <div className="flex items-center gap-3">
          {status && <span className="text-xs text-gray-400">{status}</span>}
          <a href="/" className="border text-xs rounded py-1 px-2 text-gray-500 hover:bg-gray-50 transition">← site</a>
        </div>
      </div>

      {/* profile */}
      <div className="pt-6 pb-2 border-b flex justify-between items-center">
        <h2 className="font-bold text-lg">Profile</h2>
        {!editProfile && <Btn variant="primary" onClick={() => setEditProfile(true)}>Edit</Btn>}
      </div>
      {!editProfile && profile && (
        <div className="mt-3 text-sm space-y-1 text-gray-600">
          <p><span className="text-gray-300 mr-2">name</span>{profile.name}</p>
          <p><span className="text-gray-300 mr-2">tagline</span>{profile.tagline}</p>
          <p className="text-gray-400 text-xs mt-2 leading-relaxed">{profile.bio}</p>
        </div>
      )}
      {editProfile && profileDraft && (
        <div className="border rounded p-4 mt-2 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Label>Name</Label><Input value={profileDraft.name} onChange={e => setProfileDraft({ ...profileDraft, name: e.target.value })} /></div>
            <div><Label>Tagline</Label><Input value={profileDraft.tagline} onChange={e => setProfileDraft({ ...profileDraft, tagline: e.target.value })} /></div>
            <div className="sm:col-span-2"><Label>Bio</Label><Textarea rows={3} value={profileDraft.bio} onChange={e => setProfileDraft({ ...profileDraft, bio: e.target.value })} /></div>
            <div><Label>Resume URL</Label><Input value={profileDraft.resumeUrl} onChange={e => setProfileDraft({ ...profileDraft, resumeUrl: e.target.value })} /></div>
          </div>
          <p className="text-xs text-gray-400 mt-3 mb-2">Socials</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(["medium","linkedin","twitter","vsco","email"] as const).map(k => (
              <div key={k}>
                <Label>{k}</Label>
                <Input value={profileDraft.socials[k] ?? ""} onChange={e => setProfileDraft({ ...profileDraft, socials: { ...profileDraft.socials, [k]: e.target.value } })} />
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <Btn variant="primary" onClick={saveProfile} disabled={loading}>{loading ? "Saving…" : "Save"}</Btn>
            <Btn onClick={() => { setEditProfile(false); setProfileDraft(profile); }}>Cancel</Btn>
          </div>
        </div>
      )}

      {/* projects */}
      <div className="pt-6 pb-2 border-b flex justify-between items-center">
        <h2 className="font-bold text-lg">Projects ({projects.length})</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">drag to reorder</span>
          <Btn variant="primary" onClick={() => setEditProject({ ...EMPTY_PROJECT })}>+ Add</Btn>
        </div>
      </div>
      {editProject && !editProject.id && (
        <ProjectForm initial={editProject} onSave={saveProject} onCancel={() => setEditProject(null)} loading={loading} />
      )}
      <div className="mt-1">
        {projects.map((p, i) => (
          <div
            key={p.id}
            draggable
            onDragStart={e => { e.dataTransfer.effectAllowed = "move"; setDragIdx(i); }}
            onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; setDragOverIdx(i); }}
            onDrop={e => { e.preventDefault(); handleReorder(dragIdx!, i); setDragIdx(null); setDragOverIdx(null); }}
            onDragEnd={() => { setDragIdx(null); setDragOverIdx(null); }}
            className={`transition-all ${dragOverIdx === i && dragIdx !== i ? "border-t-2 border-black" : ""}`}
          >
            <div className={`flex items-center justify-between py-2 border-b border-gray-100 gap-2 ${dragIdx === i ? "opacity-40" : ""}`}>
              <span className="text-gray-300 cursor-grab select-none text-lg shrink-0">⠿</span>
              <div className="flex gap-3 min-w-0 flex-1">
                <time className="text-xs text-gray-400 shrink-0">{p.date}</time>
                <span className="text-sm truncate">{p.title}</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <Btn onClick={() => setEditProject(p)}>Edit</Btn>
                <Btn variant="danger" onClick={() => deleteProject(p.id)}>Delete</Btn>
              </div>
            </div>
            {editProject?.id === p.id && (
              <ProjectForm initial={editProject} onSave={saveProject} onCancel={() => setEditProject(null)} loading={loading} />
            )}
          </div>
        ))}
      </div>

      {/* articles */}
      <div className="pt-6 pb-2 border-b flex justify-between items-center">
        <h2 className="font-bold text-lg">Articles ({articles.length})</h2>
        <Btn variant="primary" onClick={() => setEditArticle({ ...EMPTY_ARTICLE })}>+ Add</Btn>
      </div>
      {editArticle && !editArticle.id && (
        <ArticleForm initial={editArticle} onSave={saveArticle} onCancel={() => setEditArticle(null)} loading={loading} />
      )}
      <div className="mt-1">
        {articles.map(a => (
          <div key={a.id}>
            <div className="flex items-baseline justify-between py-2 border-b border-gray-100">
              <div className="flex gap-3 min-w-0">
                <time className="text-xs text-gray-400 shrink-0">{a.date}</time>
                <span className="text-sm truncate">{a.title}</span>
              </div>
              <div className="flex gap-2 ml-4 shrink-0">
                <Btn onClick={() => setEditArticle(a)}>Edit</Btn>
                <Btn variant="danger" onClick={() => deleteArticle(a.id)}>Delete</Btn>
              </div>
            </div>
            {editArticle?.id === a.id && (
              <ArticleForm initial={editArticle} onSave={saveArticle} onCancel={() => setEditArticle(null)} loading={loading} />
            )}
          </div>
        ))}
      </div>

      <div className="h-20" />
    </div>
  );
}