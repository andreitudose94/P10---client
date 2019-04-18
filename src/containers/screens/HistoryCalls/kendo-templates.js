export const rowTemplate = `
  <tr data-uid="#= _id #">
    <td colspan="100%" style='padding-left: 30px; padding-right: 30px;'>
      <div class="row">
        <div class="col-12 col-md-5">
          <div class="col-12">
            <div class="col-4 namefield">
              Responsible:
            </div>
            <div class="col-8">
              #: responsible.split(' | ')[0] #
            </div>
          </div>
          <div class="col-12">
            <div class="col-4 namefield">
              Caller:
            </div>
            <div class="col-8">
              #: caller #
            </div>
          <div class="col-4 namefield">
            Summary:
          </div>
          <div class="col-8">
            #: summary #
          </div>
        </div>
        <div class="col-12">
          <div class="col-4 namefield">
            DateTime:
          </div>
          <div class="col-8">
            #: datetime #
          </div>
        </div>
        <div class="col-12">
          <div class="col-4 namefield">
            Id:
          </div>
          <div class="col-8">
            #: index #
          </div>
        </div>
      </div>
      <div class="col-12 col-md-5">
        <div class="col-12">
          <div class="progressbar" id="prgBar_#:index#"></div>
        </div>
        <div class="col-12">
          <div class="col-4 namefield">
            EventAddress:
          </div>
          <div class="col-8">
            #: eventAddress #
          </div>
        </div>
        <div class="col-12">
          <div class="col-4 namefield">
            PhoneNo:
          </div>
          <div class="col-8">
            #: phoneNo #
          </div>
        </div>
        <div class="col-12">
          <div class="col-4 namefield">
            Promissed DateTime:
          </div>
          <div class="col-8">
            #: promisedDateTime #
          </div>
        </div>
      </div>
      <div class="col-12 col-md-2">
        <center>
          <button class="form-button k-button k-primary" id="btn_#:index#" data-role="button" role="button" aria-disabled="false" tabindex="0">
            View Details
          </button>
        </center>
      </div>
    </div>
  </td>
</tr>`

export const altRowTemplate = `
  <tr data-uid="#= _id #">
    <td colspan="100%" style='padding-left: 30px; padding-right: 30px; background: rgb(245, 245, 245)'>
    <div class="row">
      <div class="col-12 col-md-5">
        <div class="col-12">
          <div class="col-4 namefield">
            Responsible:
          </div>
          <div class="col-8">
            #: responsible.split(' | ')[0] #
          </div>
        </div>
        <div class="col-12">
          <div class="col-4 namefield">
            Caller:
          </div>
          <div class="col-8">
            #: caller #
          </div>
        <div class="col-4 namefield">
          Summary:
        </div>
        <div class="col-8">
          #: summary #
        </div>
      </div>
      <div class="col-12">
        <div class="col-4 namefield">
          DateTime:
        </div>
        <div class="col-8">
          #: datetime #
        </div>
      </div>
      <div class="col-12">
        <div class="col-4 namefield">
          Id:
        </div>
        <div class="col-8">
          #: index #
        </div>
      </div>
    </div>
    <div class="col-12 col-md-5">
      <div class="col-12">
        <div class="progressbar" id="prgBar_#:index#"></div>
      </div>
      <div class="col-12">
        <div class="col-4 namefield">
          EventAddress:
        </div>
        <div class="col-8">
          #: eventAddress #
        </div>
      </div>
      <div class="col-12">
        <div class="col-4 namefield">
          PhoneNo:
        </div>
        <div class="col-8">
          #: phoneNo #
        </div>
      </div>
      <div class="col-12">
        <div class="col-4 namefield">
          Promissed DateTime:
        </div>
        <div class="col-8">
          #: promisedDateTime #
        </div>
      </div>
    </div>
    <div class="col-12 col-md-2">
      <center>
        <button class="form-button k-button k-primary" id="btn_#:index#" data-role="button" role="button" aria-disabled="false" tabindex="0">
          View Details
        </button>
      </center>
    </div>
  </div>
</tr>`

export const toolbarTemplate = `
  <div class="toolbar" style='display: flex; justify-content: space-between; padding: 0px 20px;'>
    <a class="k-button form-button k-primary designedToolbarBtn" id="toolbar-addCallBtn">
      <span class="k-icon k-i-plus" style="margin: 0 4px 0 -4px;"></span>
      CALL
    </a>
    <div>
      <a class="k-button k-button-icontext k-grid-excel form-button designedToolbarBtn"><span class="k-icon k-i-excel"></span>Export to Excel</a>
    </div>
  </div>`


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
