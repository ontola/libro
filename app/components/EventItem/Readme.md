An EventItem is part of an Event. EventItems are ordered, hence the index prop. It is expandable by clicking on the title. If an EventItem is selected during a meeting, a progress bar is shown to indicate how much time is left. The same progress bar is also shown when watching a replay of a meeting for the EventItem that is discussed in the video.


## EventItem with isCurrent=true and duration data

    <div>
      <EventItem
        title="Kennismakingsbijeenkomst directeur GGDrU"
        elapsedTime={126}
        totalTime={600}
        index={1}
        isCurrent
        text="Wij willen graag in de Raadsinformatiebijeenkomst organiseren op een avond in de maand juni. We willen de raadsleden van de gemeente Utrecht dan graag laten kennismaken met onze nieuwe Directeur Publieke Gezondheid Nicolette Rigter die per 1 mei 2016 is benoemd en met het werk dat GGD regio Utrecht doet. Dit gekoppeld aan de concept Begroting 2017 en Begrotingswijziging 2016-1 die in de periode ook voorliggen bij de raden. Verder is het vertandig om aangaande periode 2 de voorzieningen te beraadslagen." />
    </div>

## EventItem without duration data

    <div>
      <EventItem
        title="Kennismakingsbijeenkomst directeur GGDrU"
        index={1}
        text="Wij willen graag in de Raadsinformatiebijeenkomst organiseren op een avond in de maand juni. We willen de raadsleden van de gemeente Utrecht dan graag laten kennismaken met onze nieuwe Directeur Publieke Gezondheid Nicolette Rigter die per 1 mei 2016 is benoemd en met het werk dat GGD regio Utrecht doet. Dit gekoppeld aan de concept Begroting 2017 en Begrotingswijziging 2016-1 die in de periode ook voorliggen bij de raden. Verder is het vertandig om aangaande periode 2 de voorzieningen te beraadslagen." />
    </div>
