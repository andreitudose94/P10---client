export const responsible_dd_headerTemplate = `
  <table class='dropdownlist_template_table'>
    <thead>
      <tr>
        <td>Name</td>
        <td>ID</td>
      </tr>
    </thead>
  </table>`

export const responsible_dd_template = `
  <table class='dropdownlist_template_table'>
    <tbody>
      <tr>
        <td> #if(dataView.split('|')[0]) {# #:dataView.split('|')[0]# #} else {#  #}#</td>
        <td> #if(dataView.split('|')[1]) {# #:dataView.split('|')[1]# #} else {#  #}#</td>
      </tr>
    </tbody>
  </table>`
