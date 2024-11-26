
function defineNewReady() {
    const listeners = [];
    const doc = window.document;
    const MutationObserver =
      window.MutationObserver || window.WebKitMutationObserver;
    let observer;
  
    function ready(selector, fn) {
      listeners.push({
        selector,
        fn,
      });
      if (!observer) {
        observer = new MutationObserver(check);
        observer.observe(doc.documentElement, {
          childList: true,
          subtree: true,
        });
      }
      check();
    }
  
    function check() {
      for (let i = 0, len = listeners.length, listener, elements; i < len; i++) {
        listener = listeners[i];
        elements = doc.querySelectorAll(listener.selector);
        for (let j = 0, jLen = elements.length, element; j < jLen; j++) {
          element = elements[j];
          if (!element.ready) {
            element.ready = [];
          }
          if (!element.ready[i]) {
            element.ready[i] = true;
            listener.fn.call(element, element);
          }
        }
      }
    }
    window.NewReady = ready;
  }
  defineNewReady();
  
  NewReady("div#offerAmountInput input#OfferInput", (ele) => {
    let minRange = parseInt(jQuery('.single-product .paira-product span.paira-default-price span.money').text().split('.')[1].replace(/\D/g, '')) * 0.8;
    let maxRange = parseInt(jQuery('.single-product .paira-product span.paira-default-price span.money').text().split('.')[1].replace(/\D/g, ''));
    jQuery(ele).after(`<p class="offerRange">Please enter a price between ${minRange} and ${maxRange}</p>`)
    jQuery(ele).keyup((event) => {
        let proPrice = parseInt(jQuery('.single-product .paira-product span.paira-default-price span.money').text().split('.')[1].replace(/\D/g, ''));
        let inputValue = parseInt(jQuery(event.currentTarget).val());
        
        // Calculate the range
        let minRange = proPrice * 0.8;
        let maxRange = proPrice;
    
        // Check if inputValue falls within the range
        if (inputValue >= minRange && inputValue < maxRange) {
            // Add class to the other element
            jQuery('.offerly-modal-content-group div#leftSide > div:not(#leftContent) button').addClass('activeOfferCTA');
        } else {
            // Remove class from the other element if outside the range
            jQuery('.offerly-modal-content-group div#leftSide > div:not(#leftContent) button').removeClass('activeOfferCTA');
        }
    });
  });

jQuery('a#reserve-btn').click((event) => {
    event.preventDefault();
    jQuery('.cu-reserve-pop-container').addClass('active');
    jQuery('body').addClass('reserve-pop-active');
});

jQuery('.cu-reserve-pop-header button').click((event) => {
    event.preventDefault();
    jQuery('.cu-reserve-pop-container').removeClass('active');
    jQuery('body').removeClass('reserve-pop-active');
});




// image slider code

function waitForConditions(callback, ...conditions) {
  const promises = conditions.map(
    (condition) =>
      new Promise((resolve) => {
        let interval = setInterval(() => {
          if (condition()) {
            clearInterval(interval);
            resolve(true);
          }
        }, 100);
      })
  );

  Promise.all(promises).then(() => {
    callback();
  });
}

waitForConditions(
  () => {
    jQuery(".single-product.paira-gap-3").before(
      '<div class="cu-product-cat-wrapper"></div>'
    );
    document
      .querySelectorAll(".product-page-template-4 .single-product-image-list a")
      .forEach((ele, i) => {
        let imgSrc = jQuery(ele).attr("data-zoom-image");
        jQuery(".cu-product-cat-wrapper").append(
          `<div class="u-product-cat-item"><img src="${imgSrc}"/></div>`
        );
      });

    function loadSlickSlider(callback) {
      // Check if Slick Slider CSS is already loaded
      if (
        !document.querySelector(
          'link[href^="https://cdn.jsdelivr.net/npm/slick-carousel"]'
        )
      ) {
        var slickCSS = document.createElement("link");
        slickCSS.rel = "stylesheet";
        slickCSS.type = "text/css";
        slickCSS.href =
          "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css";
        document.head.appendChild(slickCSS);
      }

      // Check if Slick Slider Theme CSS is already loaded
      if (
        !document.querySelector(
          'link[href^="https://cdn.jsdelivr.net/npm/slick-carousel"]'
        )
      ) {
        var slickThemeCSS = document.createElement("link");
        slickThemeCSS.rel = "stylesheet";
        slickThemeCSS.type = "text/css";
        slickThemeCSS.href =
          "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css";
        document.head.appendChild(slickThemeCSS);
      }

      // Check if jQuery is loaded
      if (typeof jQuery === "undefined") {
        var jqueryScript = document.createElement("script");
        jqueryScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";
        jqueryScript.onload = function () {
          // Now that jQuery is loaded, load Slick Slider
          loadSlickSlider(callback);
        };
        document.head.appendChild(jqueryScript);
      } else {
        // Check if Slick Slider JS is already loaded
        if (typeof $.fn.slick === "undefined") {
          var slickScript = document.createElement("script");
          slickScript.src =
            "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js";
          slickScript.onload = callback;
          document.head.appendChild(slickScript);
        } else {
          callback();
        }
      }
    }
    loadSlickSlider(function () {
      jQuery(".cu-product-cat-wrapper").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
      });
    });
  },
  () => document.querySelectorAll(".single-product.paira-gap-3").length > 0,
  () =>
    document.querySelectorAll(
      ".product-page-template-4 .single-product-image-list a"
    ).length > 0,
  () => window.innerWidth < 768,
  () => typeof jQuery == "function"
);


jQuery(document).on('click', 'a#make_offer_btn', (event) => {
    event.preventDefault();
    jQuery('.button_flex_col button#offerButton').click();
});



// advance filtter js code

let conditions = [];
let brands = [];
let colors = [];
let materials = [];
let productTypes = [];
let priceRanges = [
    {min: 0, max: 10000},
    {min: 10000, max: 20000},
    {min: 30000, max: 40000},
    {min: 40000, max: 50000},
    {min: 50000, max: 60000},
    {min: 60000, max: 70000},
    {min: 70000, max: 80000},
    {min: 80000, max: 90000},
    {min: 90000, max: 100000}, // 90-1L
    {min: 100000, max: 200000}, // 1-2L
    {min: 200000, max: 300000}, // 2-3L
    {min: 300000, max: 400000}, // 3-4L
    {min: 400000, max: 500000},  // 4-5L
    {min: 500000, max: 9999999999}
];

function addCheckbox(containerSelector, value, filterType) {
    const container = jQuery(containerSelector);
    const checkbox = `<div><input type="checkbox" value="${value}" data-product-con="${value}" filter-type="${filterType}" id="${value}"><label for="${value}">${value}</label></div>`;
    container.append(checkbox);
}

function addPriceRangeCheckboxes(containerSelector) {
    const container = jQuery(containerSelector);
    priceRanges.forEach((range, index) => {
        const value = `${range.min}-${range.max}`;
        const checkbox = `<div><input type="checkbox" value="${value}" data-product-con="${value}" filter-type="data-price-range" id="price-range-${index}"><label for="price-range-${index}">Rs ${range.min} - ${range.max > 500000 ? 'infinite' : range.max}</label></div>`;
        container.append(checkbox);
    });
}

// Add price range checkboxes
addPriceRangeCheckboxes('.nv-advance-filter-price');

NewReady(".product-con", (ele) => {
    let proPrice = jQuery(ele).attr('data-price');
    let proCondition = jQuery(ele).attr('data-condition');
    let proBrand = jQuery(ele).attr('data-brand');
    let proColor = jQuery(ele).attr('data-color');
    let proMaterial = jQuery(ele).attr('data-material');
    let proProductType = jQuery(ele).attr('data-producttype');
    
    if (!conditions.includes(proCondition)) {
        conditions.push(proCondition);
        addCheckbox('.nv-advance-filter-condition', proCondition, 'data-condition');
    }

    if (!brands.includes(proBrand)) {
        brands.push(proBrand);
        addCheckbox('.nv-advance-filter-brand', proBrand, 'data-brand');
    }

    if (!colors.includes(proColor)) {
        colors.push(proColor);
        addCheckbox('.nv-advance-filter-color', proColor, 'data-color');
    }

    if (!materials.includes(proMaterial)) {
        materials.push(proMaterial);
        addCheckbox('.nv-advance-filter-material', proMaterial, 'data-material');
    }

    if (!productTypes.includes(proProductType)) {
        productTypes.push(proProductType);
        addCheckbox('.nv-advance-filter-ptype', proProductType, 'data-producttype');
    }

    console.log(proPrice, proCondition, proBrand, proColor, proMaterial, proProductType);
});

console.log('Conditions:', conditions);
console.log('Brands:', brands);
console.log('Colors:', colors);
console.log('Materials:', materials);
console.log('Product Types:', productTypes);

NewReady("div#nv-advance-filter > div input", (ele) => {
    jQuery(ele).click((event) => {
        updateProductVisibility();
    });
});

function updateProductVisibility() {
    jQuery('.collection-page .product-con').hide();

    let checkedFilters = jQuery('div#nv-advance-filter > div input:checked');

    if (checkedFilters.length === 0) {
        jQuery('.collection-page .product-con').show();
        updateActiveFilters();
        return;
    }

    let filterGroups = {
        'data-condition': [],
        'data-brand': [],
        'data-color': [],
        'data-material': [],
        'data-producttype': [],
        'data-price-range': []
    };

    checkedFilters.each((j, filter) => {
        let filterType = jQuery(filter).attr('filter-type');
        let filterValue = jQuery(filter).attr('value');
        filterGroups[filterType].push(filterValue);
    });

    jQuery('.collection-page .product-con').each((i, product) => {
        let proPrice = parseInt(jQuery(product).attr('data-price').slice(0, -2));
        let proCondition = jQuery(product).attr('data-condition');
        let proBrand = jQuery(product).attr('data-brand');
        let proColor = jQuery(product).attr('data-color');
        let proMaterial = jQuery(product).attr('data-material');
        let proProductType = jQuery(product).attr('data-producttype');

        let showProduct = (
            (filterGroups['data-condition'].length === 0 || filterGroups['data-condition'].includes(proCondition)) &&
            (filterGroups['data-brand'].length === 0 || filterGroups['data-brand'].includes(proBrand)) &&
            (filterGroups['data-color'].length === 0 || filterGroups['data-color'].includes(proColor)) &&
            (filterGroups['data-material'].length === 0 || filterGroups['data-material'].includes(proMaterial)) &&
            (filterGroups['data-producttype'].length === 0 || filterGroups['data-producttype'].includes(proProductType)) &&
            (filterGroups['data-price-range'].length === 0 || filterGroups['data-price-range'].some(range => {
                let [min, max] = range.split('-').map(Number);
                return proPrice >= min && proPrice <= max;
            }))
        );

        if (showProduct) {
            jQuery(product).show();
        }
    });

    updateActiveFilters();
}

function updateActiveFilters() {
    const activeFilterWrapper = jQuery('.active-filter-wrapper');
    activeFilterWrapper.empty();

    const checkedFilters = jQuery('div#nv-advance-filter > div input:checked');
    
    if (checkedFilters.length === 0) {
        activeFilterWrapper.hide();
        return;
    }

    activeFilterWrapper.show();
    
    checkedFilters.each((index, filter) => {
        const filterType = jQuery(filter).attr('filter-type');
        const filterValue = jQuery(filter).attr('value');
        const filterLabel = jQuery(filter).next('label').text();
        
        const activeFilterElement = jQuery(`
            <span class="active-filter">
                ${filterLabel}
                <button class="remove-filter" data-filter-type="${filterType}" data-filter-value="${filterValue}">×</button>
            </span>
        `);
        
        activeFilterWrapper.append(activeFilterElement);
    });
    updateActiveFilterContainerVisibility();
}


function removeFilter(filterType, filterValue) {
    const checkbox = jQuery(`div#nv-advance-filter > div input[filter-type="${filterType}"][value="${filterValue}"]`);
    checkbox.prop('checked', false);
    updateProductVisibility();
    updateActiveFilterContainerVisibility();
}

// Use event delegation for dynamically added elements
jQuery(document).on('click', '.remove-filter', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const filterType = jQuery(this).data('filter-type');
    const filterValue = jQuery(this).data('filter-value');
    removeFilter(filterType, filterValue);
});

// Modify your existing click handler
NewReady("div#nv-advance-filter > div input", (ele) => {
    jQuery(ele).on('change', (event) => {
        updateProductVisibility();
    });
});

function updateActiveFilterContainerVisibility() {
    const activeFilterContainer = jQuery('.active-filter-container');
    const activeFilters = jQuery('.active-filter-wrapper .active-filter');

    if (activeFilters.length > 0) {
        activeFilterContainer.show();
    } else {
        activeFilterContainer.hide();
    }
}

// Initial call to set up active filters
jQuery(document).ready(function() {
    updateProductVisibility();
    updateActiveFilterContainerVisibility();
});


jQuery(document).on('click', '.nv-advance-filter-header', (event) => {
    jQuery(event.currentTarget).toggleClass('active');
});

jQuery(document).on('click', '.search-btn-mb', () => {
   jQuery('div#serches').toggleClass('active'); 
});

jQuery(document).on('click', '.search-hidden .search-btn.close-search', () => {
    jQuery('div#serches').toggleClass('active');
});