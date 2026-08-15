import React, { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, X, Lock, CheckCircle, AlertCircle, Loader2, Image } from 'lucide-react';

interface GalleryImage {
  objectPath: string;
  servingUrl: string;
  name: string;
}

const BASE = 'https://brickbybrickelevations-api.onrender.com';

export default function Admin() {
  const [pin, setPin] = useState('');
  const [authed, setAuthed] = useState(false);
  const [pinError, setPinError] = useState('');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [deletingName, setDeletingName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function verifyPin(p: string) {
    try {
      const res = await fetch(`${BASE}/api/storage/gallery`, {
        headers: { 'x-admin-pin': p },
      });
      if (res.ok) {
        setAuthed(true);
        setPinError('');
        sessionStorage.setItem('admin-pin', p);
        loadGallery(p);
      } else {
        setPinError('Incorrect PIN');
      }
    } catch (err) {
      setPinError('Could not reach server');
    }
  }

  async function loadGallery(p: string) {
    try {
      const res = await fetch(`${BASE}/api/storage/gallery`, {
        headers: { 'x-admin-pin': p },
      });
      if (res.ok) {
        const data = await res.json();
        setImages(data.images || []);
      }
    } catch (err) {
      setError('Failed to load gallery');
    }
  }

  useEffect(() => {
    const savedPin = sessionStorage.getItem('admin-pin');
    if (savedPin) {
      setPin(savedPin);
      verifyPin(savedPin);
    }
  }, []);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError('');

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append('photo', file);

        const res = await fetch(`${BASE}/api/storage/gallery/upload`, {
          method: 'POST',
          headers: { 'x-admin-pin': pin },
          body: formData,
        });

        if (!res.ok) {
          throw new Error('Upload failed');
        }
      } catch (err) {
        setError(`Failed to upload ${file.name}`);
      }
    }

    setUploading(false);
    loadGallery(pin);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleDelete(objectPath: string) {
    setDeletingName(objectPath);
    try {
      const res = await fetch(`${BASE}/api/storage/gallery/${objectPath}`, {
        method: 'DELETE',
        headers: { 'x-admin-pin': pin },
      });
      if (res.ok || res.status === 404) {
        setImages((prev) => prev.filter((img) => img.objectPath !== objectPath));
      } else {
        setError('Failed to delete image');
      }
    } catch (err) {
      setError('Failed to delete image');
    } finally {
      setDeletingName(null);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center">
          <div className="mx-auto mb-4 w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
            <Lock className="text-yellow-500" size={28} />
          </div>
          <h1 className="text-xl font-bold mb-1">Admin Login</h1>
          <p className="text-gray-500 text-sm mb-6">Enter your admin PIN to manage project photos.</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && verifyPin(pin)}
            className="w-full border rounded-lg px-4 py-3 mb-3 text-center tracking-widest"
            placeholder="PIN"
          />
          {pinError && <p className="text-red-500 text-sm mb-3">{pinError}</p>}
          <button
            onClick={() => verifyPin(pin)}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg"
          >
            UNLOCK
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 px-6 py-5 flex items-center justify-between">
        <div>
          <span className="text-yellow-400 font-bold text-xl">BRICKBYBRICK</span>{' '}
          <span className="text-gray-300">PHOTO MANAGER</span>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem('admin-pin');
            setAuthed(false);
          }}
          className="text-gray-300 hover:text-white flex items-center gap-1"
        >
          <X size={16} /> Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-10 text-center mb-10 transition cursor-pointer border-[#F5A200] bg-white hover:bg-yellow-50"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {uploading ? (
            <Loader2 className="mx-auto animate-spin text-yellow-500" size={48} />
          ) : (
            <Upload className="mx-auto text-yellow-500" size={48} />
          )}
          <p className="font-bold mt-4">
            {uploading ? 'UPLOADING...' : 'CLICK OR DRAG PHOTOS HERE'}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            JPG, PNG, WebP — multiple files at once supported
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-lg">UPLOADED PHOTOS ({images.length})</h2>
          <button
            onClick={() => loadGallery(pin)}
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            REFRESH
          </button>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-gray-400 py-16">
            <Image className="mx-auto mb-3" size={40} />
            <p>No photos yet. Upload your first project above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img.objectPath} className="relative group rounded-lg overflow-hidden border">
                <img src={img.servingUrl} alt={img.name} className="w-full h-40 object-cover" />
                <button
                  onClick={() => handleDelete(img.objectPath)}
                  disabled={deletingName === img.objectPath}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-red-500 hover:text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  {deletingName === img.objectPath ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
