import React from 'react';

export default function ResumeViewer({ data }) {
  // If no specific file is provided, default to the resume
  const fileUrl = data?.url || '/assets/Aditya_Patel_Resume.pdf';

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#e0e0e0', // gray background for the area around the PDF
      display: 'flex',
      flexDirection: 'column'
    }}>
      <iframe
        src={fileUrl}
        title="Resume"
        style={{
          width: '100%',
          flex: 1,
          border: 'none'
        }}
      />
    </div>
  );
}
