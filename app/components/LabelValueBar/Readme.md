Used to display percentages.

    <LabelValueBar label="Kamerleden" value="12"/>

Works great in CardRow components

    <Card>
      <CardRow>
        <CardContent>
          <LabelValueBar label="PvdA" value={80}/>
        </CardContent>
      </CardRow>
      <CardRow>
        <CardContent>
          <LabelValueBar label="VVD" value={56}/>
        </CardContent>
      </CardRow>
    </Card>
