// types/documents.ts

export interface DocumentMetadata {
    fileName: string;
    fileSize: number;      // In bytes
    fileType: string;      // e.g. 'application/pdf'
    uploadedAt: string;    // ISO timestamp
  }
  
  export interface DocumentUploadResponse {
    success: boolean;
    uploaded: DocumentMetadata[];
  }
  
  export interface DocumentListResponse {
    documents: DocumentMetadata[];
  }
  
  export interface DocumentDeleteResponse {
    success: boolean;
    message: string;
  }
  