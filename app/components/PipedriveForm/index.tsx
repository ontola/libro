import React from 'react';

const PIPEDRIVE_FORM_URL = 'https://webforms.pipedrive.com/f/JJw99yDkXav2SVTvGiEs7pXNHJTAxP2zGw1UTQ6NK8AmCp643bD97K3WeRzXfVN';
const PIPEDRIVE_SCRIPT_URL = 'https://webforms.pipedrive.com/f/loader';

export const usePipedrive = (): React.Ref<HTMLDivElement> => {
  const pipedriveDivRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = PIPEDRIVE_SCRIPT_URL;

    const div = pipedriveDivRef.current;

    div && div.appendChild(script);

    return () => {
      div && document.body.removeChild(div);
    };
  }, []);

  return pipedriveDivRef;
};

export const PipedriveForm = (): JSX.Element => {
  const pipedriveDivRef = usePipedrive();

  return (
    <div
      className="pipedriveWebForms"
      data-pd-webforms={PIPEDRIVE_FORM_URL}
      ref={pipedriveDivRef}
    />
  );
};
