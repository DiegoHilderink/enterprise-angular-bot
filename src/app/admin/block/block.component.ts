import { Component, OnInit } from '@angular/core';
import { BotService } from '../../core/shared/services/bot/bot.service';
import { ConfErrors } from '../../core/models/conf-error';
declare var $: any;

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  bloqueados = [];
  news = [];
  errors = [];
  num;

  constructor(private bot: BotService) { }

  ngOnInit(): void {
    this.setBloqueados();
    this.hide('#output-group', '#num-hide');
    this.hide('#error-group', '#err-hide');
    $('#alert-group').hide();
  }

  /**
   * Gets all blocked numbers from JSON file and push them into bloqueados[]
   */
  setBloqueados() {
    var aux = this.bot.getBlocked();
    aux.forEach(k => {
      this.bloqueados.push(k)
    });
  }

  /**
   * Method which takes input value and push it into bloqueados[] 
   * if they accomplished all requiremets
   */
  addNumber() {
    var input = $('#num-block');
    var numbers = input.val().split(',');
    numbers.forEach(element => {
      if (element.length <= 13 && element.length >= 9) {
        element = parseInt(element)
        if (this.binarySearch(element)) {
          this.errors.push(new ConfErrors(element, 'exists'))
        } else {
          this.bloqueados.push(parseInt(element));
          this.news.push(parseInt(element));
        }
      } else {
        element = parseInt(element)
        this.errors.push(new ConfErrors(element, 'length'))
      }
    });

    if ($('#output-group').css("display") != "none") {
      this.showBlocked();
    }

    if (this.news.length > 0 && this.news.length < 2) {
      $('#list-blocked-group').append(
        '<div class="btn btn-primary rounded-circle float-right" id="block-info">'
            + this.news.length
        + '</div'
      )
    } else {
      $('#block-info').empty()
      $('#block-info').html(this.news.length)
    }

    if (this.errors.length > 0 && this.errors.length < 2) {
      $('#list-err-group').append(
        '<div class="btn btn-primary rounded-circle float-right" id="err-info">'
            + this.errors.length
        + '</div'
      )
    } else {
      $('#err-info').empty()
      $('#err-info').html(this.errors.length)
    }

    input.val('');
  }

  /**
   * Method which display the blocked numbers in the user's screen
   */
  showBlocked() {
    var output = $('#output');
    var group = $('#output-group');
    var hide = $('#num-hide');

    output.empty();
    if($('#block-info').length){
      $('#block-info').remove()
    }

    if (!(Array.isArray(this.bloqueados) && this.bloqueados.length)) {
      output.append("<option> No se encuentran números bloqueados. </option>");
      group.show();
      hide.show()
    } else {
      this.bloqueados.forEach(k => {
        output.append("<option>" + k + "</option>");
      });
      hide.show()
      group.show();
    }

    if ($('#error-group').css("display") != "none") {
      this.hide('#error-group', '#err-hide');
    } else if ($('#alert-group').css("display") != "none") {
      $('#alert-group').hide();
    }
  }

  /**
   * Show screen with all errors collected
   */
  showErrors() {
    var output = $('#errors');
    var group = $('#error-group');
    var hide = $('#err-hide');

    output.empty();
    if($('#err-info').length){
      $('#err-info').remove()
    }

    if (!(Array.isArray(this.errors) && this.errors.length)) {
      output.append("<option> No se encuentran números bloqueados. </option>");
      group.show();
      hide.show()

    } else {
      this.errors.forEach(k => {
        var aux = k.getValues();
        output.append("<option>" + aux['num'] + ' : ' + aux['msg'] + "</option>");
      });
      group.show();
      hide.show()
    }


    if ($('#output-group').css("display") != "none") {
      this.hide('#output-group', '#num-hide');
    } else if ($('#alert-group').css("display") != "none") {
      $('#alert-group').hide();
    }
  }

  /**
   * Method which search duplicated numbers in array.
   * @param item 
   */
  private binarySearch(item) {
    var low = 0;
    var high = this.bloqueados.length - 1;
    while (low <= high) {
      var middle = Math.floor((low + high) / 2);
      var guess = this.bloqueados[middle];
      if (guess > item) {
        high = middle - 1;
      } else if (guess < item) {
        low = middle + 1;
      } else if (guess === item) {
        return true;
      }
    }
    return false;
  }

  /**
   * Hides the list of bloqued numbers.
   */
  hide(output, hide) {
    $(output).hide();
    $(hide).hide();
  }

  /**
   * Loads in security modal screen all number changes before 
   * send the JSON
   */
  load() {
    if (this.news.length > 0) {
      this.news.forEach(element => {
        $('#load').append('<li>' + element + '</li>')
      });
    } else {
      $('#load').append('<p><strong>Sin cambios detectados.</strong></p>')
    }
  }

  /**
   * Sends a new JSON file
   */
  send() {
    if (this.news.length > 0) {
      console.log('números enviados correctamente....')
      this.setBloqueados();
    } else {

      if ($('#error-group').css("display") != "none") {
        this.hide('#error-group', '#err-hide');
      } else if ($('#output-group').css("display") != "none") {
        this.hide('#output-group', '#num-hide');
      }

      $('#alert-group').show();

      $('#alerts').append('<div class="alert alert-warning alert-dismissible fade show">' +
        '<button type="button" class="close" id="warning-alert" data-dismiss="alert">&times;</button>' +
        '<strong>Warning!</strong> No hay cambios detectados. No se ha enviado información.</div>')

      $('#warning-alert').click(() => {
        this.alertEmpty();
      })
    }
  }

  /**
   * Display screen alerts.
   */
  alertEmpty() {
    if ($.trim($("selector").html()) == '') {
      $('#alert-group').hide();
    }
  }

  /**
   * Clean the output screen.
   */
  clean() {
    $('#load').empty();
  }
}
