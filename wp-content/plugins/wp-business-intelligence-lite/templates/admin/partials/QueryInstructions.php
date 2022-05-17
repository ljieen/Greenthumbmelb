<style>
  .wpbiInstructions th {
    text-align: left;
  }
</style>
<p>You may insert the following placeholders in your query to have them replaced with WordPress variables:</p>
<table class='wpbiInstructions'>
  <tr>
    <th>Variable</th>
    <th>Description</th>
    <th>Notes</th>
  </tr>
  <tr>
    <td>:user_id</td>
    <td>the current user ID</td>
    <td>returns 0 if there is no user logged in</td>
  </tr>
  <tr>
    <td>:user_login</td>
    <td>the current user login</td>
    <td>returns empty string if there is no user logged in</td>
  </tr>
  <tr>
    <td>:user_email</td>
    <td>the current user email address</td>
    <td>returns empty string if there is no user logged in</td>
  </tr>
  <tr>
    <td>:post_id</td>
    <td>the current post/page id</td>
    <td>only works in the loop, otherwise returns 0</td>
  </tr>
  <tr>
    <td>:blog_id</td>
    <td>the current site id</td>
    <td>used for multisite.  Always returns an Integer</td>
  </tr>
</table>