
    <FormField
      id="ArgumentProDescription"
      label="What's your name?"
      name="text"
      placeholder="Firstname Lastname"
      element="input"
    />

Use the "Field--preview" classname to show them in a minimal, pretty fashion in a card."

    <Card>
      <FormField
        className="Field--heading"
        element="textArea"
        id="ArgumentProDescription"
        name="text"
        placeholder="Title"
        minRows={1}
        variant="preview"
      />
      <FormField
        element="textArea"
        id="ArgumentProDescription"
        name="text"
        placeholder="Description (optional)..."
        minRows={3}
        variant="preview"
      />
    </Card>

Use the 'material' variant to add some sexy minimalism. Currently requires JS and redux to work, though.

    <Card>
      <FormField
        id="Materialexample"
        name="material"
        label="What's your favorite material?"
        element="textArea"
        variant="material"
      />
      <FormField
        id="Materialexample"
        name="font"
        label="And your favorite font?"
        element="input"
        variant="material"
      />
    </Card>

Use with the Redux Form Field Component (not show in below code, because it does not work in Styleguidist) to enable errors and form validation.

    <FormField
      id="ArgumentProDescription"
      label="Your name please"
      name="text"
      element="input"
      meta={{
        error: "Oh no, a hardcoded error message!",
        touched: true,
      }}
    />
