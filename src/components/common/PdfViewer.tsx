"use client"

import { Worker, Viewer } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';


import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';



export default function PdfViewer({fileUrl}: {fileUrl: string}){
    const zoomPluginInstance = zoomPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const getFilePluginInstance = getFilePlugin();

    const { ZoomInButton, ZoomOutButton } = zoomPluginInstance;
    const { GoToNextPage, GoToPreviousPage, NumberOfPages } = pageNavigationPluginInstance;
    const { DownloadButton } = getFilePluginInstance;


    return (
        <div className="flex flex-col w-full h-full">
            <div className="h-fit w-full rounded-md border dark:border-gray-700 overflow-hidden shadow-md">
                <Worker 
                    workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer 
                        fileUrl={fileUrl}
                        plugins={[ zoomPluginInstance, pageNavigationPluginInstance, getFilePluginInstance ]}
                    />
                </Worker>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 p-3 rounded-md bg-gray-100 dark:bg-gray-800 shadow-sm text-sm text-gray-900 dark:text-gray-200">
                <ZoomOutButton />
                <ZoomInButton />
                <GoToPreviousPage />
                <NumberOfPages />
                <GoToNextPage />
                <DownloadButton />
            </div>

            
        </div>
    )
}