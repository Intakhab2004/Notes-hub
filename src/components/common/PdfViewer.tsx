"use client"

import { Worker, Viewer } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { getFilePlugin } from '@react-pdf-viewer/get-file';

import '@react-pdf-viewer/core/lib/styles/index.css';



export default function PdfViewer({fileUrl}: {fileUrl: string}){
    const zoomPluginInstance = zoomPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const getFilePluginInstance = getFilePlugin();

    const { ZoomInButton, ZoomOutButton } = zoomPluginInstance;
    const { CurrentPageInput, GoToNextPage, GoToPreviousPage, NumberOfPages } = pageNavigationPluginInstance;
    const { DownloadButton } = getFilePluginInstance;


    return (
        <div className="w-full max-w-4xl p-5 md:p-8 my-10 space-y-8 bg-white rounded-lg shadow-md dark:bg-[#1b1b31] dark:shadow-gray-500">
            <Worker 
                workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer 
                    fileUrl={fileUrl}
                    plugins={[ zoomPluginInstance, pageNavigationPluginInstance, getFilePluginInstance ]}
                />
            </Worker>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <ZoomOutButton />
                <ZoomInButton />
                <GoToPreviousPage />
                <CurrentPageInput /> / <NumberOfPages />
                <GoToNextPage />
                <DownloadButton />
            </div>
        </div>
    )
}