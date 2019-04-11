export const template = `
  <tr data-uid="#= _id #">
    <td colspan="4" style='padding-left: 0; padding-right: 0; border-bottom: 1px solid \\#e5e5e5;'>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 users-table-cell"> <span class="companies-col-inline-title">Name:</span> #: name #</div>
          <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 users-table-cell"> <span class="companies-col-inline-title">Email:</span> #: email #</div>
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 users-table-cell"> <span class="companies-col-inline-title">Address</span> #: address #</div>
        </div>
      </div>
    </td>
  </tr>`

export const toolbarTemplate = `
  <div class="toolbar" style='display: flex; justify-content: space-between;'>
    <a class="k-button" id="toolbar-add-btn">
      <span class="k-icon k-i-plus" style="margin: 0 4px 0 -4px;"></span>
      COMPANY
    </a>
    <div>
      <a class="k-button k-button-icontext k-grid-excel"><span class="k-icon k-i-excel"></span>Export to Excel</a>
      <a class="k-button k-button-icontext k-grid-pdf"><span class="k-icon k-i-pdf"></span>Export to PDF</a>
    </div>
  </div>`
