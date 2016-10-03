Shows a formatted date. Inputs must be Date objects.

    <DetailDate
      date={new Date(1375428515361)}
    />

You can add createdAt, startsAt and more dates, which will show on hover.

    <DetailDate
      createdAt={new Date(1473455315361)}
      startsAt={new Date(1375428515361)}
      endsAt={new Date(1275488515361)}
      updatedAt={new Date(1172488515361)}
    />
