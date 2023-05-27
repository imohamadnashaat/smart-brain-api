const handleClarifaiImagePost = (req, res) => {
  const { imageUrl } = req.body;
  const PAT = process.env.PAT;
  const USER_ID = process.env.USER_ID;
  const APP_ID = process.env.APP_ID;
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

  fetch('https://api.clarifai.com/v2/models/' + MODEL_ID + '/outputs', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT,
    },
    body: JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(400).json(error));
};

export { handleClarifaiImagePost };
