'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import OnboardingContainer from "@/app/(onboarding)/OnboardingContainer";


const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
}

export default function () {
  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploaded = acceptedFiles[0]
    if (!uploaded) return

    const isAllowed = Object.keys(ACCEPTED_FILE_TYPES).includes(uploaded.type)
    if (!isAllowed) {
      alert('❌ Please upload a PDF or Word document (.pdf, .doc, .docx)')
      return
    }

    setFile(uploaded)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: ACCEPTED_FILE_TYPES,
  })

  const removeFile = () => setFile(null)

  return (
    <OnboardingContainer title="Add Resume" next={'skills'} hidePrev>

      <Card
        {...getRootProps()}
        className="p-8 border-2 border-dashed border-gray-400 dark:border-gray-600 bg-muted/20 rounded-xl min-h-[250px] text-center cursor-pointer transition hover:border-primary"
      >
        <input {...getInputProps()} />

        {!file ? (
          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <UploadCloud className="h-8 w-8" />
            <p className="text-sm">
              <span className="font-semibold text-foreground">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PDF, DOC or DOCX files only (max 5MB)
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-foreground text-sm truncate max-w-xs">
              📄 <strong>{file.name}</strong>
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="flex items-center gap-1"
            >
              <X className="w-4 h-4" /> Remove
            </Button>
          </div>
        )}
      </Card>
    </OnboardingContainer>
  )
}
