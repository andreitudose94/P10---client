export const template = `
  <tr data-uid="#= _id #">
    <td colspan="100%" style='padding-left: 0; padding-right: 0; border-bottom: 1px solid \\#e5e5e5;'>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 col-md-5 col-lg-5 col-xl-5 callers-table-cell"> <span class="callers-col-inline-title">Company: </span> #: company #</div>
          <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 callers-table-cell"> <span class="callers-col-inline-title">Name: </span> #: name #</div>
          <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 callers-table-cell"> <span class="callers-col-inline-title">SSN: </span> #: ssn #</div>
        </div>
      </div>
    </td>
  </tr>`

export const toolbarTemplate = `
  <div class="toolbar" style='display: flex; justify-content: space-between;'>
    <a class="k-button" id="toolbar-add-btn">
      <span class="k-icon k-i-plus" style="margin: 0 4px 0 -4px;"></span>
      Caller
    </a>
    <div>
      <a class="k-button k-button-icontext k-grid-excel"><span class="k-icon k-i-excel"></span>Export to Excel</a>
      <a class="k-button k-button-icontext k-grid-pdf"><span class="k-icon k-i-pdf"></span>Export to PDF</a>
    </div>
  </div>`
