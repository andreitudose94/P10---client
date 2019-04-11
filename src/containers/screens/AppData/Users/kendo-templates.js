export const template = `
  <tr data-uid="#= _id #">
    <td colspan="5" style='padding-left: 0; padding-right: 0; border-bottom: 1px solid \\#e5e5e5;'>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 col-md-5 col-lg-5 col-xl-5 users-table-cell"> <span class="users-col-inline-title">Email:</span> #: email #</div>
          <div class="col-sm-12 col-md-1 col-lg-1 col-xl-1 users-table-cell"> <span class="users-col-inline-title">Role:</span> #: role #</div>
          <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 users-table-cell"> <span class="users-col-inline-title">Name:</span> #: name #</div>
          <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 users-table-cell"> <span class="users-col-inline-title">Tenants:</span> #: tenantsList #</div>
        </div>
      </div>
    </td>
  </tr>`

export const toolbarTemplate = `
  <div class="toolbar" style='display: flex; justify-content: space-between;'>
    <a class="k-button" id="toolbar-add-btn">
      <span class="k-icon k-i-plus" style="margin: 0 4px 0 -4px;"></span>
      USER
    </a>
    <div>
      <a class="k-button k-button-icontext k-grid-excel"><span class="k-icon k-i-excel"></span>Export to Excel</a>
      <a class="k-button k-button-icontext k-grid-pdf"><span class="k-icon k-i-pdf"></span>Export to PDF</a>
    </div>
  </div>`
