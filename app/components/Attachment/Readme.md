Attachments show a file that can be opened, downloaded and previewed.

## Not downloaded

    <Attachment  
      title="Some_document.pdf"
      url="http://downloads.palass.org/annual_meeting/2000/confabs2000.pdf"
      isDownloaded={false}
      isDownloading={false}
      percentageDownloaded={0}
      hasPreview={true}
    />

## Downloading

    <Attachment  
      title="Some_document.pdf"
      url="http://downloads.palass.org/annual_meeting/2000/confabs2000.pdf"
      isDownloaded={false}
      isDownloading={true}
      percentageDownloaded={78}
      hasPreview={true}
    />

## Downloaded

    <Attachment  
      title="Some_document.pdf"
      url="http://downloads.palass.org/annual_meeting/2000/confabs2000.pdf"
      isDownloaded={true}
      percentageDownloaded={100}
      hasPreview={true}
    />

## No preview possible

    <Attachment  
      title="Some_document.pdf"
      url="http://downloads.palass.org/annual_meeting/2000/confabs2000.pdf"
      hasPreview={false}
    />

## Huge filename / title

    <Attachment  
      title="Having_a_huge_filename_is_actually_quite_common_in_governmental_organisations.pdf"
      url="http://downloads.palass.org/annual_meeting/2000/confabs2000.pdf"
    />
