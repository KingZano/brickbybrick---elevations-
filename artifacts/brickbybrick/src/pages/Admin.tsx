import React, { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, X, Lock, CheckCircle, AlertCircle, Loader2, Image } from 'lucide-react';

interface GalleryImage {
  objectPath: string;
  servingUrl: string;
  name: string;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function Admin() {
  const [pin, setPin] = useState('');
  const [authed, setAuthed] = useState(false);
  const [pinError, setPinError] = useState('');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [deletingName, setDeletingName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function verifyPin(p: string) {
    try {
      const res = await fetch('/api/storage/gallery', {
        headers: { 'x-admin-pin': p },
      });
      if (res.ok) {
        setAuthed(true);
        setPinError('');
        localStorage.setItem('bbAdmin', p);
      } else {
        setPinError('Incorrect PIN. Try again.');
      }
    } catch {
      setPinError('Could not reach server. Make sure the API is running.');
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('bbAdmin');
    if (saved) verifyPin(saved);
  }, []);

  useEffect(() => {
    if (authed) loadGallery();
  }, [authed]);

  async function loadGallery() {
    const saved = localStorage.getItem('bbAdmin') || pin;
    const res = await fetch('/api/storage/gallery', {
      headers: { 'x-admin-pin': saved },
    });
    if (res.ok) {
      const data = await res.json();
      setImages(data.images || []);
    }
  }

  async function handleUpload(files: FileList) {
    const saved = localStorage.getItem('bbAdmin') || pin;
    setUploading(true);
    setUploadProgress([]);
    setError('');

    const fileArray = Array.from(files);
    const results: string[] = [];

    for (const file of fileArray) {
      try {
        results.push(`Uploading ${file.name}…`);
        setUploadProgress([...results]);

        // Step 1: get presigned URL
        const metaRes = await fetch('/api/storage/uploads/request-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-pin': saved,
          },
          body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type }),
        });

        if (!metaRes.ok) {
          results[results.length - 1] = `✗ ${file.name} — failed to get upload URL`;
          setUploadProgress([...results]);
          continue;
        }

        const { uploadURL } = await metaRes.json();

        // Step 2: PUT directly to GCS
        const putRes = await fetch(uploadURL, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file,
        });

        if (putRes.ok) {
          results[results.length - 1] = `✓ ${file.name}`;
        } else {
          results[results.length - 1] = `✗ ${file.name} — upload failed`;
        }
        setUploadProgress([...results]);
      } catch (err) {
        results[results.length - 1] = `✗ ${file.name} — error`;
        setUploadProgress([...results]);
      }
    }

    setUploading(false);
    await loadGallery();
  }

  async function handleDelete(img: GalleryImage) {
    const saved = localStorage.getItem('bbAdmin') || pin;
    setDeletingName(img.name);
    try {
      await fetch(`/api/storage/gallery/${encodeURIComponent(img.name)}`, {
        method: 'DELETE',
        headers: { 'x-admin-pin': saved },
      });
      await loadGallery();
    } catch {
      setError('Failed to delete image.');
    } finally {
      setDeletingName(null);
    }
  }

  function logout() {
    localStorage.removeItem('bbAdmin');
    setAuthed(false);
    setPin('');
    setImages([]);
  }

  // ── PIN screen ──────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="bg-[#F5A200] p-3 rounded-full">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-wide text-gray-900" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Admin Login
            </h1>
            <p className="text-gray-500 text-sm text-center">Enter your admin PIN to manage project photos.</p>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); verifyPin(pin); }}
            className="flex flex-col gap-4"
          >
            <input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="border-2 border-gray-200 focus:border-[#F5A200] outline-none rounded-lg px-4 py-3 text-lg text-center tracking-[0.3em] font-bold"
              autoFocus
            />
            {pinError && (
              <p className="text-red-500 text-sm text-center flex items-center justify-center gap-1">
                <AlertCircle className="w-4 h-4" /> {pinError}
              </p>
            )}
            <button
              type="submit"
              className="bg-[#F5A200] text-white font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-yellow-500 transition-colors"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Admin dashboard ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 px-6 py-5 flex items-center justify-between">
        <div>
          <span className="text-[#F5A200] font-black text-2xl uppercase tracking-wide" style={{ fontFamily: 'Oswald, sans-serif' }}>
            BrickByBrick
          </span>
          <span className="text-gray-400 text-sm ml-3 uppercase tracking-widest">Photo Manager</span>
        </div>
        <button
          onClick={logout}
          className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
        >
          <X className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Upload zone */}
        <div
          className={`border-2 border-dashed rounded-xl p-10 text-center mb-10 transition-colors cursor-pointer ${
            uploading ? 'border-gray-300 bg-gray-100' : 'border-[#F5A200] bg-white hover:bg-yellow-50'
          }`}
          onClick={() => !uploading && fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (!uploading && e.dataTransfer.files.length) handleUpload(e.dataTransfer.files);
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleUpload(e.target.files)}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-[#F5A200] animate-spin" />
              <p className="font-bold text-gray-700 uppercase tracking-wide" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Uploading…
              </p>
              <div className="text-left max-w-xs mx-auto mt-2 space-y-1">
                {uploadProgress.map((msg, i) => (
                  <p key={i} className={`text-sm ${msg.startsWith('✓') ? 'text-green-600' : msg.startsWith('✗') ? 'text-red-500' : 'text-gray-500'}`}>
                    {msg}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="bg-[#F5A200]/10 p-4 rounded-full">
                <Upload className="w-10 h-10 text-[#F5A200]" />
              </div>
              <p className="text-xl font-black uppercase tracking-wide text-gray-800" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Click or drag photos here
              </p>
              <p className="text-gray-400 text-sm">JPG, PNG, WebP — multiple files at once supported</p>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
          </div>
        )}

        {/* Gallery grid */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black uppercase tracking-wide text-gray-900" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Uploaded Photos
            <span className="ml-3 text-gray-400 text-lg">({images.length})</span>
          </h2>
          <button
            onClick={loadGallery}
            className="text-sm text-gray-500 hover:text-[#F5A200] transition-colors uppercase tracking-widest font-bold"
          >
            Refresh
          </button>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Image className="w-14 h-14 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-bold uppercase tracking-wide" style={{ fontFamily: 'Oswald, sans-serif' }}>
              No photos yet
            </p>
            <p className="text-sm mt-1">Upload your first project photo above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {images.map((img) => (
              <div key={img.objectPath} className="relative group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 aspect-square">
                <img
                  src={img.servingUrl}
                  alt={img.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(img)}
                    disabled={deletingName === img.name}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors disabled:opacity-50"
                    title="Delete photo"
                  >
                    {deletingName === img.name ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs truncate">{img.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
          <p>Photos uploaded here will appear in the <strong>Our Work</strong> gallery on the public website.</p>
          <a href={`${BASE}/`} className="text-[#F5A200] hover:underline mt-1 inline-block">← Back to website</a>
        </div>
      </div>
    </div>
  );
}
