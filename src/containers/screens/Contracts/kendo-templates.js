export const template = `
  <tr data-uid="#= _id #">
    <td colspan="100%" style='padding-left: 0; padding-right: 0; border-bottom: 1px solid \\#e5e5e5;'>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 contracts-table-cell"> <span class="contracts-col-inline-title">ContractNumber: </span> #: contractNumber #</div>
          <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 contracts-table-cell"> <span class="contracts-col-inline-title">Company: </span> #: company #</div>
          <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 contracts-table-cell"> <span class="contracts-col-inline-title">StartDate: </span> #: startDate #</div>
          <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 contracts-table-cell"> <span class="contracts-col-inline-title">EndDate: </span> #: endDate #</div>
          <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 contracts-table-cell"> <span class="contracts-col-inline-title">Comment: </span> #: comment #</div>
          <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 contracts-table-cell"> <span class="contracts-col-inline-title">Services: </span> # if (services.length) { # #: services.map((s) => s.name).join() # # } else { # - # }#</div>
        </div>
      </div>
    </td>
  </tr>`

export const toolbarTemplate = `
  <div class="toolbar" style='display: flex; justify-content: space-between;'>
    <a class="k-button" id="toolbar-add-btn">
      <span class="k-icon k-i-plus" style="margin: 0 4px 0 -4px;"></span>
      Contract
    </a>
    <div>
      <a class="k-button k-button-icontext k-grid-excel"><span class="k-icon k-i-excel"></span>Export to Excel</a>
      <a class="k-button k-button-icontext k-grid-pdf"><span class="k-icon k-i-pdf"></span>Export to PDF</a>
    </div>
  </div>`
