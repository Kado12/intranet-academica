import React, { useState, useRef, useCallback } from 'react';
import { Button } from './Button';
import {
  CameraIcon,
  XMarkIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  aspectRatio?: '16:9' | '1:1';
  required?: boolean;
  label?: string;
  error?: string;
  previewUrl?: string;
  onRemove?: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  aspectRatio = '1:1',
  required = false,
  label = 'Foto de perfil',
  error,
  previewUrl,
  onRemove,
}) => {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectRatioClasses = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
  };

  const handleFileSelect = useCallback((file: File) => {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona una imagen válida (JPG, PNG, WebP)');
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no puede exceder 5MB');
      return;
    }

    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Llamar al callback
    onImageSelect(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onRemove?.();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {preview ? (
        <div className="relative">
          <div className={`
            ${aspectRatioClasses[aspectRatio]} 
            w-full max-w-md mx-auto 
            rounded-lg overflow-hidden 
            border-2 border-gray-200
          `}>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-center space-x-4 mt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClick}
              className="flex items-center"
            >
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Cambiar foto
            </Button>

            {onRemove && (
              <Button
                type="button"
                variant="danger"
                onClick={handleRemove}
                className="flex items-center"
              >
                <XMarkIcon className="h-4 w-4 mr-2" />
                Quitar
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            ${aspectRatioClasses[aspectRatio]}
            w-full max-w-md mx-auto
            border-2 border-dashed rounded-lg
            flex flex-col items-center justify-center
            cursor-pointer transition-colors
            ${isDragging
              ? 'border-blue-500 bg-blue-50'
              : error
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }
          `}
        >
          <CameraIcon className={`h-12 w-12 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
          <p className="mt-2 text-sm text-gray-600">
            {isDragging ? 'Suelta la imagen aquí' : 'Haz click o arrastra una imagen'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            JPG, PNG o WebP (máx. 5MB)
          </p>
          {aspectRatio === '16:9' && (
            <p className="text-xs text-gray-400 mt-1">
              Formato horizontal 16:9, del pecho hacia arriba
            </p>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
      />

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};