export const caller_dd_headerTemplate = `
  <table class='dropdownlist_template_table'>
    <thead>
      <tr>
        <td>Companies</td>
        <td>Name</td>
        <td>CNP</td>
      </tr>
    </thead>
  </table>`

export const caller_dd_template = `
  <table class='dropdownlist_template_table'>
    <tbody>
      <tr>
        <td> #if(name.split('|')[0]) {# #:name.split('|')[0]# #} else {#  #}#</td>
        <td> #if(name.split('|')[1]) {# #:name.split('|')[1]# #} else {#  #}#</td>
        <td> #if(name.split('|')[2]) {# #:name.split('|')[2]# #} else {#  #}#</td>
      </tr>
    </tbody>
  </table>`

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
        <td> #if(name.split('|')[0]) {# #:name.split('|')[0]# #} else {#  #}#</td>
        <td> #if(name.split('|')[1]) {# #:name.split('|')[1]# #} else {#  #}#</td>
      </tr>
    </tbody>
  </table>`
