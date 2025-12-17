import React, { useEffect, useRef, useState } from "react";
import type { AvatarSelectorTypes } from "../../types/types";
import { User, Upload, Trash } from "lucide-react";

const AvatarSelector = ({ setProfile }: AvatarSelectorTypes) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewURL, setPreviewURL] = useState<null | string>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (!file || file.length === 0) {
      return;
    }

    const selectedFile = file[0];
    setProfile(selectedFile);
    const preview = URL.createObjectURL(selectedFile);
    setPreviewURL(preview);
  };

  const handleRemoveImage = () => {
    setProfile(null);
    setPreviewURL(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  return (
    <div className="flex justify-center items-center mb-6">
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        ref={inputRef}
        className="hidden"
      />

      {!previewURL ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
          <User size="36px" className="text-primary" />

          <button
            type="button"
            onClick={onChooseFile}
            className="h-8 w-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
          >
            <Upload size="16px" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewURL}
            className="h-20 w-20 rounded-full object-cover"
            alt="Avatar"
          />
          <button
            onClick={handleRemoveImage}
            type="button"
            className="h-8 w-8 flex justify-center items-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
          >
            <Trash size="16px" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarSelector;
