'use client';

import { RxEnterFullScreen } from 'react-icons/rx';

import { useRef } from 'react';

import { Button } from '@/components/ui/button';

const AxiosDocs = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleFullscreen = async () => {
    if (iframeRef.current) {
      await iframeRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative overflow-hidden rounded">
      <iframe
        ref={iframeRef}
        allowFullScreen
        className="h-96 w-full"
        src="https://axios-http.com/docs/intro"
        title="axios-docs"
      />
      <Button className="absolute right-5 top-5" size="icon" onClick={toggleFullscreen}>
        <RxEnterFullScreen />
      </Button>
    </div>
  );
};

export { AxiosDocs };
