Shows a formatted date. Inputs must be Date objects.

    <DetailDate
      dateCreated={new Date(1375428515361)}
    />

You can add dateCreated, startDate and more dates, which will show on hover.

    <DetailDate
      dateCreated={new Date(1473455315361)}
      startDate={new Date(1375428515361)}
      endDate={new Date(1275488515361)}
      updatedAt={new Date(1172488515361)}
    />
