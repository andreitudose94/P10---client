export const template = `
  <tr data-uid="#= _id #">
    <td colspan="100%" style='padding-left: 0; padding-right: 0; border-bottom: 1px solid \\#e5e5e5;'>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 services-table-cell"> <span class="services-col-inline-title">Name: </span> #: name #</div>
          <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 services-table-cell"> <span class="services-col-inline-title">Description: </span> #: description #</div>
          <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 services-table-cell"> <span class="services-col-inline-title">Start Date Time: </span>#if(startDateTime) { # #: startDateTime # # } else { # - # } #</div>
          <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 services-table-cell"> <span class="services-col-inline-title">Duration(min): </span>#if(duration) { # #: duration # # } else { # - # } #</div>
          <div class="col-sm-12 col-md-1 col-lg-1 col-xl-1 services-table-cell"> <span class="services-col-inline-title">Total Price: </span>#if(totalPrice) { # #: totalPrice # # } else { # - # } #</div>
          <div class="col-sm-12 col-md-1 col-lg-1 col-xl-1 services-table-cell"> <span class="services-col-inline-title">Currency: </span> #: currency #</div>
          <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 services-table-cell"> <span class="services-col-inline-title">On contract: </span> #if(extraService) { # No # } else { # Yes # } #</div>
        </div>
      </div>
    </td>
  </tr>`
