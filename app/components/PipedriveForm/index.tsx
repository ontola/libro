import React from 'react';

const PIPEDRIVE_SCRIPT_URL = 'https://webforms.pipedrive.com/f/loader';

export interface PipedriveFormProps {
  url: string;
}

const usePipedrive = (url: string): React.Ref<HTMLDivElement> => {
  const pipedriveDivRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = PIPEDRIVE_SCRIPT_URL;

    const div = pipedriveDivRef.current;

    div && div.appendChild(script);

    return () => {
      script.remove();
    };
  }, [url]);

  return pipedriveDivRef;
};

export const PipedriveForm: React.FC<PipedriveFormProps> = ({ url }) => {
  const pipedriveDivRef = usePipedrive(url);

  return (
    <div
      className="pipedriveWebForms"
      data-pd-webforms={url}
      ref={pipedriveDivRef}
    />
  );
};
