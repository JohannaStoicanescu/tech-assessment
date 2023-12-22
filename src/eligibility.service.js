class EligibilityService {
  /**
   * Compare cart data with criteria to compute eligibility.
   * If all criteria are fulfilled then the cart is eligible (return true).
   *
   * @param cart
   * @param criteria
   * @return {boolean}
   */

  isEligible(cart, criteria) {
    for(const element in criteria) {
      if(!this.isCriteriaMet(element, cart, criteria)) {
        return false;
      }
    };
    return true;
  }

  isCriteriaMet(element, cart, criteria) {
    const criteriaArray = element.split('.')
    if (criteriaArray.length > 1) {
      cart.hasOwnProperty(criteriaArray[0])
    } else {
      cart.hasOwnProperty(criteriaArray)
    }
    if(!this.findValue(criteriaArray, cart)) {
      return false
    }
    if(!this.compareValue(this.findValue(criteriaArray, cart), criteria)) {
      return false
    }
    return true
  }

  findValue(criteriaArray, cart) {
    if (criteriaArray.length > 1) {
      let result = []
      for (const element in cart[criteriaArray[0]]) {
        result.push(cart[criteriaArray[0]][element][criteriaArray[1]])
      }
      const key = criteriaArray.join(".")
      return [ key, result ]
    } else {
      return [criteriaArray[0], cart[criteriaArray]]
    }
  }

  compareValue(value, criteria) {
    if (criteria[value[0]] === value[1]) {
      return true
    } else {
      if(Object.keys(criteria[value[0]])[0] === 'in') {
        if(value[1].includes(criteria[value[0]].in[0])){
          return true;
        }
        return false;
      }
      if(Object.keys(criteria[value[0]])[0] === 'gt') {
        if(value[1] > criteria[value[0]].gt){
          return true;
        }
        return false;
      }
      if(Object.keys(criteria[value[0]])[0] === 'lt') {
        if(value[1] < criteria[value[0]].lt){
          return true;
        }
        return false;
      }
      if(Object.keys(criteria[value[0]])[0] === 'gte') {
        if(value[1] >= criteria[value[0]].gt){
          return true;
        }
        return false;
      }
      if(Object.keys(criteria[value[0]])[0] === 'lte') {
        if(value[1] <= criteria[value[0]].lt){
          return true;
        }
        return false;
      }
      if(Object.keys(criteria[value[0]])[0] === 'and') {
        if(Object.keys(criteria[value[0]])[0] === 'in') {
          if(!value[1].includes(criteria[value[0]].in[0])){
            return false;
          }
        }
        if(Object.keys(criteria[value[0]])[0] === 'gt') {
          if(!value[1] > criteria[value[0]].gt){
          return false;
          }
        }
        if(Object.keys(criteria[value[0]])[0] === 'lt') {
          if(!value[1] < criteria[value[0]].lt){
            return false;
          }
        }
        if(Object.keys(criteria[value[0]])[0] === 'gte') {
          if(value[1] >= criteria[value[0]].gt){
            return false;
          }
        }
        if(Object.keys(criteria[value[0]])[0] === 'lte') {
          if(value[1] <= criteria[value[0]].lt){
            return false;
          }
        }
        return true
      }
    }

    return true;
  }
}


module.exports = {
  EligibilityService,
};
