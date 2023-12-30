export const reposEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Email Template</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background: #f0f0f0;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #fff;
    }
    h1 {
      color: #ef476f;
      text-align: center;
      margin-top: 0;
      font-family: 'Helvetica', sans-serif;
    }
    p {
      color: #555;
      line-height: 1.5;
      font-family: 'Georgia', serif;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      color: #888;
    }

    h2 {
      text-align: center;
      color: #3498db;
    }
    .repository {
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #ecf0f1;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>See what the GitHub community is most excited about today.</h1>
    <% repos.forEach(repo => { %>
      <div class="repository">
        <h2><%= repo.name %></h2>
        <p>Link: <%= repo.link %></p>
        <p>Description: <%= repo.description %></p>
      </div>
    <% }); %>
    <div class="footer">
      <p>This is an auto-generated message. Please do not reply.</p>
      <a href="https://github.com/poysa213">My github</a>
    </div>
  </div>
</body>
</html>
`

export const successSubscriptionEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GitHub Newsletter Subscription</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    h1 {
      color: #333;
    }
    p {
      color: #555;
      line-height: 1.6;
    }
    a {
      color: #0366d6;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>GitHub Newsletter Subscription</h1>
    <p>Thank you for subscribing to the GitHub Newsletter. You're now part of our community, where you'll receive the latest updates on trending repositories and exciting GitHub news.</p>
    <p>Explore more on GitHub: <a href="https://github.com/trending" target="_blank">https://github.com/trending</a></p>
    <a href="https://github.com/poysa213">My github</a>
  </div>
</body>
</html>
`