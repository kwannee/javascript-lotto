import { $ } from '../utils/element-manager.js';
import { SELECTOR } from '../constants/selector.js';
import { makeLottosCountTemplate, makeLottoTemplate } from '../utils/Lotto/template-manager.js';

export default class LottoListView {
  #container;
  #lottoNumberToggle;
  constructor($element) {
    this.#container = $element;
    this.#lottoNumberToggle = $($element, `#${SELECTOR.ID.NUMBER_TOGGLE}`);
  }

  bindLottoNumberToggle() {
    this.#lottoNumberToggle.addEventListener('click', this.toggleShow.bind(this));
  }

  toggleShow() {
    const toggle = this.#lottoNumberToggle.dataset;
    toggle.state = toggle.state === 'on' ? 'off' : 'on';

    const { dataset: itemContainer } = $(
      this.#container,
      `.${SELECTOR.CLASS.LOTTO_ITEM_CONTAINER}`
    );
    itemContainer.list = itemContainer.list === 'open' ? 'close' : 'open';
  }

  renderLottoList(lottos) {
    $(this.#container, `.${SELECTOR.CLASS.LOTTO_ITEM_CONTAINER}`).innerHTML = lottos
      .map((numbers) => makeLottoTemplate(numbers))
      .join('');

    $(this.#container, `#${SELECTOR.ID.LOTTO_BOUGHT_COUNT}`).textContent = makeLottosCountTemplate(
      lottos.length
    );
  }
}
