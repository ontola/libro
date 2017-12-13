The Column component takes all direct children and makes columns out of them.

Make sure to give each child a `key` property to ensure proper rendering.

      <Columns>
        <Card key="col-1">Column 1</Card>
        <Card key="col-1">Column 2</Card>
      </Columns>

Custom flexBasis (for narrower columns)

      <Columns flexBasis="0">
        <Card key="col-1">Column 1</Card>
        <Card key="col-2">Column 2</Card>
        <Card key="col-3">Column 3</Card>
        <Card key="col-4">Column 4</Card>
      </Columns>
