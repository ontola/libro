The Column component takes all direct children and makes columns out of them.

    <div>
      <Columns>
        <Box>Column 1</Box>
        <Box>Column 2</Box>
      </Columns>
      <Columns>
        <Box>Column 1</Box>
        <Box>Column 2</Box>
        <Box>Column 3</Box>
      </Columns>
      <Columns>
        <Box>Column 1</Box>
        <Box>Column 2</Box>
        <Box>Column 3</Box>
        <Box>Column 4</Box>
      </Columns>
    </div>

Columns can also be used as a horizontal list

    <Columns flexGrow={false} gutter="small">
      <Detail text="3 minutes ago" icon="clock-o" />
      <Detail text="Motion" icon="lightbulb-o" />
    </Columns>
