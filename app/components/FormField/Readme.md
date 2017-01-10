
    <FormField
      id="ArgumentProDescription"
      label="Your name please"
      name="text"
      placeholder="Firstname Lastname"
      element="input"
    />

Use the "Field--preview" classname to show them in a minimal, pretty fashion in a card."

    <Card>
      <FormField
        id="ArgumentProDescription"
        name="text"
        placeholder="Title"
        className="Field--heading Field--preview"
        rows={1}
        element="textArea"
      />
      <FormField
        id="ArgumentProDescription"
        name="text"
        placeholder="Description (optional)..."
        className="Field--textarea Field--preview"
        rows={3}
        element="textArea"
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
