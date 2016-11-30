An event that appears in the ChronoFeed. It can be a speech, a comment, an activity or any other type of event.

    <ChronoItem
      startDate={new Date(1444444444444)}
      text="Text!"
    >
      De voorzitter staat op en doet een dansje.
    </ChronoItem>

By including a speaker, a picture is added by matching its profile ID

    <ChronoItem
      startDate={new Date(1444444444444)}
      endDate={new Date(1444444494444)}
      speaker={someProfileId}
      text="Text!"
    >
      Heer de voorzitter, ik zou graag willen weten waarom de vrouw Houtenberg deze reactie in haar motie heeft verwerkt.
    </ChronoItem>

Add a
