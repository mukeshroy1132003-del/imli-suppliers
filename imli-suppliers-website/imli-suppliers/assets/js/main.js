/* Imli Suppliers — site interactions */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* mobile menu */
  var btn = $('.menu-btn'), nav = $('.nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Close' : 'Menu';
    });
  }

  /* year */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* product filter */
  var chips = $$('.chip[data-filter]');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
      var f = c.getAttribute('data-filter');
      $$('.prod[data-cat]').forEach(function (p) {
        p.hidden = !(f === 'all' || p.getAttribute('data-cat') === f);
      });
    });
  });

  /* product gallery thumbs */
  var main = $('.pd-main img');
  $$('.thumbs button').forEach(function (b, i, all) {
    b.addEventListener('click', function () {
      all.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      var img = b.querySelector('img');
      main.src = img.src; main.alt = img.alt;
    });
  });

  /* grade picker */
  var note = $('.grade-note');
  $$('.grade').forEach(function (g, i, all) {
    g.addEventListener('click', function () {
      all.forEach(function (x) { x.setAttribute('aria-pressed', x === g ? 'true' : 'false'); });
      if (note) note.textContent = g.getAttribute('data-note');
      var sel = $('#q-grade'); if (sel) sel.value = g.getAttribute('data-grade');
    });
  });

  /* bag calculator */
  var qty = $('#calc-qty'), unit = $('#calc-unit'), bag = $('#calc-bag');
  function calc() {
    if (!qty) return;
    var q = parseFloat(qty.value) || 0;
    var kg = unit.value === 't' ? q * 1000 : unit.value === 'q' ? q * 100 : q;
    var size = parseFloat(bag.value);
    var bags = Math.ceil(kg / size);
    var truck = kg <= 0 ? '—' : kg <= 1500 ? 'Pickup' : kg <= 9000 ? '1 truck' : Math.ceil(kg / 9000) + ' trucks';
    $('#out-kg').textContent = kg.toLocaleString('en-IN');
    $('#out-bags').textContent = kg > 0 ? bags.toLocaleString('en-IN') : '0';
    $('#out-truck').textContent = truck;
  }
  [qty, unit, bag].forEach(function (el) { if (el) el.addEventListener('input', calc); });
  calc();

  /* quote form */
  $$('form[data-quote]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      $$('[required]', form).forEach(function (f) {
        var err = f.parentNode.querySelector('.err');
        var bad = !f.value.trim() || (f.type === 'tel' && f.value.replace(/\D/g, '').length < 10);
        if (bad) {
          ok = false;
          if (!err) { err = document.createElement('span'); err.className = 'err'; f.parentNode.appendChild(err); }
          err.textContent = f.type === 'tel' ? 'Enter a 10-digit mobile number.' : 'This field is needed for your quote.';
          f.setAttribute('aria-invalid', 'true');
        } else if (err) { err.remove(); f.removeAttribute('aria-invalid'); }
      });
      if (!ok) { var first = $('[aria-invalid="true"]', form); if (first) first.focus(); return; }
      var name = ($('#q-name', form) || {}).value || '';
      var box = document.createElement('div');
      box.className = 'success'; box.setAttribute('role', 'status');
      box.innerHTML = '<h3>Quote request received</h3><p>Thank you' + (name ? ', ' + name.replace(/[<>&"]/g, '') : '') +
        '. Our sales team will call you within 2 working hours with today’s rate and dispatch date.</p>' +
        '<p class="muted">Need it faster? Message us on WhatsApp at +91 90000 00000.</p>';
      form.replaceWith(box);
    });
  });

  /* copy buttons */
  $$('.copy[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      var done = function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1600); };
      try {
        navigator.clipboard.writeText(text).then(done, function () { select(b); });
      } catch (e) { select(b); }
    });
  });
  function select(b) {
    var t = b.parentNode.querySelector('b');
    var r = document.createRange(); r.selectNodeContents(t);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    b.textContent = 'Selected';
  }

  /* lightbox */
  var items = $$('.gallery button');
  if (items.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox'; lb.hidden = true;
    lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML = '<button class="btn btn--light close" type="button">Close</button><figure><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(lb);
    var last;
    var close = function () { lb.hidden = true; if (last) last.focus(); };
    items.forEach(function (b) {
      b.addEventListener('click', function () {
        last = b;
        var img = b.querySelector('img');
        $('img', lb).src = img.src; $('img', lb).alt = img.alt;
        $('figcaption', lb).textContent = b.querySelector('figcaption').textContent;
        lb.hidden = false; $('.close', lb).focus();
      });
    });
    $('.close', lb).addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lb.hidden) close(); });
  }
})();
