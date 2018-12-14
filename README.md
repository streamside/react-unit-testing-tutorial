# react-unit-testing-tutorial

## Setup

* jest.config.json
* /src/tests/setupTests.js

## Jest

### Core Functions: `describe()`, `it()` and `expect()`

In your test files, Jest puts each of [these methods and objects](https://jestjs.io/docs/en/api) into the global
environment. You don't have to import anything to use them.

```javascript
function sum(a, b) {
  return a + b;
}

describe('Sum', () => {
  it('adds 1 + 2 to equal 3', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
})
```

See source code in `src/js/1-plain-js` for full code example.

### `beforeEach()`

```javascript
describe('Sum', () => {
  beforeEach(() => {
    console.log('(A) Executed before each test case');
  });

  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  
  it('adds 5 + 1 to equal 6', () => {
    expect(sum(5, 1)).toBe(6);
  });
})
```

Output:
```
(A) Executed before each test case
(A) Executed before each test case
```

### Nested describe()

```javascript
describe('Sum', () => {
  beforeEach(() => {
    console.log('(A) Outer describe');
  });

  it('adds 1 + 2 to equal 3', () => {});
  
  it('adds 5 + 1 to equal 6', () => {});
  
  describe('when using invalid parameters', () => {
    beforeEach(() => {
      console.log('(B) Nested describe');
    });

    it('throws if a character is provided', () => {});

    it('does some other test', () => {});
  });
})
```

Output:
```
(A) Executed before each test case    // adds 1 + 2 to equal 3
(A) Executed before each test case    // adds 5 + 1 to equal 6
(A) Executed before each test case    // throws if a character is provided
(B) Nested describe                   // throws if a character is provided
(A) Executed before each test case    // does some other test
(B) Nested describe                   // does some other test
```

### Expect Matchers

When you're writing tests, you often need to check that values meet certain conditions. expect gives you access to a
number of "matchers" that let you validate different things.

```javascript
expect(result).toBeTruthy();

expect(result).toEqual({
  type: 'Part',
  name: '1200-0001'
});

expect(result).toBeNull();

expect(result).not.toBeNull();
```

See [Jest documentation](https://jestjs.io/docs/en/expect) for all matchers.

## React Component

### Component Contract

A contract defines the expected behavior of your component and what assumptions are reasonable to have about its usage.
Without a clear contract, your component may be hard to understand. Writing tests is a great way to formally define your
component’s contract.

Every React component has at least one thing that contributes to the definition of its contract:

* What it renders (which may be nothing)

Additionally, most component contracts are affected by these things as well:

* **The props** the component receives
* **The state** the component holds (if any)
* What the component does when the **user interacts with it** (via clicking, dragging, keyboard input, etc)

### What (Not) To Test

* Will the test have to duplicate exactly the application code? This will make it brittle.
* Will making assertions in the test duplicate any behavior that is already covered by (and the responsibility of) library code?
* From an outsider’s perspective, is this detail important, or is it only an internal concern? Can the effect of this internal detail be described using only the component’s public API?
* Prop types are not worth testing
* Inline styles are usually not worth testing
* Don’t test things that are not the concern of your component

### Tests

Example how to test `<CloseButton />` which is a React Component .

**CloseButton.jsx**
```javascript
import React from 'react';
import PropTypes from 'prop-types';

const CloseButton = ({ visible, onClose, icon }) => {
    if (!visible) {
        return null;
    }
    return <i className={`${icon} close`} onClick={onClose} />;
};

CloseButton.propTypes = {
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired
};

export default CloseButton;
```

**CloseButton.test.jsx**
```javascript
import React from 'react';
import { mount } from 'enzyme';
import CloseButton from '../CloseButton';

describe('<CloseButton />', () => {
    let props;

    beforeEach(() => {
        props = {
            visible: true,
            icon: 'ti-f ti-close-f',
            onClose: jest.fn()
        };
    });

    const closeButton = () => mount(<CloseButton {...props} />);

    describe('when "visible" is true', () => {
        it('renders a close button', () => {
            expect(closeButton().find('.close').length).toBe(1);
        });

        it('uses icon in props', () => {
            expect(
                closeButton()
                    .find('.close')
                    .prop('className')
            ).toMatch(props.icon);
        });

        it('calls the "onClose" prop when clicked', () => {
            closeButton()
                .find('.close')
                .simulate('click');
            expect(props.onClose.mock.calls.length).toBe(1);
        });
    });

    describe('when "visible" is false', () => {
        beforeEach(() => {
            props.visible = false;
        });

        it('does not render a close button', () => {
            expect(closeButton().html()).toBeNull();
        });
    });
});
```

## Writing Tests
 
### 1. Plain Java Script

### 2. React Component

### 3. Redux-React Container

### 4. Redux Reducers

## Jest Features

### Mocking

## Looking Forward

* Pipeline setup in each repository to run tests when commits are pushed 
* Write test case(s) when introducing new features
* Write test case when fixing bugs

## Resources

[Jest](https://jestjs.io/) - Documentation<br>
[Enzyme](https://airbnb.io/enzyme/)</a> - Documentation<br>
[The Right Way to Test React Components](https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22) - Article outlining the ideas used in this tutorial (humble title...) 
