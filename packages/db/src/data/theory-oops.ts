import { SeedFlashcard } from '../data';

export const THEORY_OOPS_30: SeedFlashcard[] = [
  {
    id: 'oop-1',
    deckCategory: 'OOPs',
    front: 'Explain the 4 Fundamental Pillars of Object-Oriented Programming with code examples.',
    back: `1. **Encapsulation**: Bundling state (data) and behavior (methods) together while restricting direct access to internal fields (via \`private\` modifiers + public getters/setters). Maintains object invariants.
2. **Abstraction**: Hiding internal implementation complexity and exposing only essential interfaces to users (via Abstract Classes and Interfaces).
3. **Inheritance**: Mechanism where a child class acquires properties and behaviors of a parent class ("is-a" relationship), facilitating code reuse and polymorphism.
4. **Polymorphism**: The ability of a message or method invocation to be processed in different ways based on the runtime object type (Compile-time via Overloading; Runtime via Overriding).`,
    tags: ['OOPs', 'Foundations', 'Encapsulation', 'Polymorphism', 'Abstraction', 'Inheritance'],
  },
  {
    id: 'oop-2',
    deckCategory: 'OOPs',
    front: 'Abstraction vs Encapsulation: What is the core conceptual and architectural distinction?',
    back: `| Feature | Abstraction | Encapsulation |
|---|---|---|
| **Core Question** | *"What does the object do?"* (Outer interface) | *"How does the object do it internally?"* (Inner data protection) |
| **Focus** | Hiding unwanted details / complexity | Hiding internal state / data from direct unauthorized tampering |
| **Mechanism** | Abstract classes, Interfaces | Access modifiers (\`private\`, \`protected\`), Getters, Setters |
| **Real-World Analogy** | Car dashboard / steering wheel (you don't need to know how fuel injection works to drive) | Car engine hood locked shut to prevent passengers from accidentally severing wires |`,
    tags: ['OOPs', 'Abstraction', 'Encapsulation', 'Design Principles'],
  },
  {
    id: 'oop-3',
    deckCategory: 'OOPs',
    front: 'Compile-Time Polymorphism vs Runtime Polymorphism: Mechanism, binding, and speed.',
    back: `| Feature | Compile-Time (Static) Polymorphism | Runtime (Dynamic) Polymorphism |
|---|---|---|
| **Mechanism** | **Method Overloading** & Operator Overloading | **Method Overriding** via Virtual Functions / Interfaces |
| **Binding Time** | Early Binding (Static Binding) at compile time | Late Binding (Dynamic Binding) at runtime |
| **Resolution** | Compiler matches method name + argument signature | Resolved via **VTABLE / VPTR** lookup at runtime |
| **Performance** | Zero runtime overhead (direct jump instruction) | Slight pointer indirection overhead (~1-2 clock cycles) |`,
    tags: ['OOPs', 'Polymorphism', 'Binding', 'Overloading', 'Overriding'],
  },
  {
    id: 'oop-4',
    deckCategory: 'OOPs',
    front: 'Method Overloading vs Method Overriding: Detailed rules and constraints.',
    back: `• **Method Overloading**:
  - Same method name within the **same class** with **different parameter signatures** (different count, types, or order of parameters).
  - Return type *alone* cannot be used to overload methods!
  - Compile-time polymorphism.
• **Method Overriding**:
  - Subclass provides a specific implementation of a method defined in its superclass.
  - Must have the **exact same name, return type (or covariant return), and parameter types**.
  - Access modifier in child cannot be more restrictive than in parent (e.g. parent \`protected\` cannot be overridden as \`private\`).
  - Runtime polymorphism.`,
    tags: ['OOPs', 'Overloading', 'Overriding', 'Methods'],
  },
  {
    id: 'oop-5',
    deckCategory: 'OOPs',
    front: 'How does the Virtual Table (VTABLE) and Virtual Pointer (VPTR) mechanism work in C++ / Java?',
    back: `When a class declares or inherits a \`virtual\` function:
1. **VTABLE (Virtual Table)**: The compiler generates a static array of function pointers for that class, pointing to the most-derived implementations of its virtual methods.
2. **VPTR (Virtual Pointer)**: Every instantiated object of that class has a hidden pointer (\`vptr\`) injected at the beginning of its memory layout, pointing to its class\'s VTABLE.
3. **Execution**:
   When invoking \`basePtr->draw()\`:
   - CPU reads \`basePtr->vptr\` to locate the VTABLE.
   - Indexes into the table for \`draw\` function pointer.
   - Jumps to the exact resolved function address. Allows runtime dynamic dispatch in $O(1)$!`,
    tags: ['OOPs', 'VTABLE', 'VPTR', 'Virtual Functions', 'Low-Level'],
  },
  {
    id: 'oop-6',
    deckCategory: 'OOPs',
    front: 'Abstract Class vs Interface: When should you choose which?',
    back: `| Feature | Abstract Class | Interface |
|---|---|---|
| **Relationship** | Represents identity (**"is-a"**) | Represents peripheral capability (**"can-do"**) |
| **State / Variables** | Can have instance variables, state, and constructors | Only \`public static final\` constants (Java); no instance state |
| **Methods** | Can have both abstract methods and full concrete implementations | Pure abstract contracts (Java 8+ allows default/static methods) |
| **Inheritance** | Single inheritance only (a class can extend only 1 class) | Multiple inheritance allowed (a class can implement multiple interfaces) |
| **Rule of Thumb** | Use when classes share common code and identity (e.g. \`Vehicle\` $\\to$ \`Car\`) | Use to define contract across unrelated classes (e.g. \`Comparable\`, \`Serializable\`) |`,
    tags: ['OOPs', 'Abstract Class', 'Interface', 'Design'],
  },
  {
    id: 'oop-7',
    deckCategory: 'OOPs',
    front: 'What is the Diamond Problem in Multiple Inheritance and how is it resolved in C++ vs Java?',
    back: `• **The Diamond Problem**: Class $B$ and $C$ inherit from $A$. Class $D$ inherits from both $B$ and $C$. If $A$ has a method \`foo()\`, which copy of \`foo()\` does $D$ inherit? Ambiguity!
• **C++ Resolution**: **Virtual Inheritance** (\`class B : virtual public A\`). Ensures only a single shared instance of the base class $A$ subobject exists inside $D$.
• **Java Resolution**: Java eliminates multiple class inheritance entirely (a class cannot extend 2 classes). Classes can implement multiple interfaces; if a conflict arises with Java 8 default methods, the subclass is forced to explicitly override and disambiguate: \`InterfaceA.super.foo()\`.`,
    tags: ['OOPs', 'Multiple Inheritance', 'Diamond Problem', 'C++', 'Java'],
  },
  {
    id: 'oop-8',
    deckCategory: 'OOPs',
    front: 'Why should software engineers "Favor Composition over Inheritance"?',
    back: `• **Inheritance ("is-a") Pitfalls**:
  - Tight compile-time coupling: Subclasses depend on parent internal implementation details ("white-box reuse"). If parent changes, subclasses often break (**Fragile Base Class problem**).
  - Cannot change inheritance relationships dynamically at runtime.
• **Composition ("has-a") Advantages**:
  - Loose coupling: Objects contain references to other objects through interfaces ("black-box reuse").
  - Dynamically swappable at runtime (e.g. swapping Strategy algorithms).
  - Prevents combinatorial class explosion.
  - Much easier to mock and unit test!`,
    tags: ['OOPs', 'Composition', 'Inheritance', 'Clean Code'],
  },
  {
    id: 'oop-9',
    deckCategory: 'OOPs',
    front: 'Explain the Single Responsibility Principle (SRP) in SOLID.',
    back: `**Single Responsibility Principle (SRP)**:
*"A class should have one, and only one, reason to change."*
• **Violation**: An \`Invoice\` class that calculates totals, formats HTML invoices, AND connects to PostgreSQL to save invoices. It has 3 distinct actors/reasons to change: accounting math, UI designers, and DB admins!
• **Refactored**:
  - \`Invoice\`: Only holds items and calculates amounts.
  - \`InvoicePrinter\`: Handles PDF/HTML rendering.
  - \`InvoiceRepository\`: Handles persistence to database.
• **Benefit**: Enhances maintainability, reduces merge conflicts, and isolates regression bugs.`,
    tags: ['OOPs', 'SOLID', 'SRP', 'Architecture'],
  },
  {
    id: 'oop-10',
    deckCategory: 'OOPs',
    front: 'Explain the Open/Closed Principle (OCP) in SOLID.',
    back: `**Open/Closed Principle (OCP)**:
*"Software entities (classes, modules, functions) should be open for extension, but closed for modification."*
• **Meaning**: You should be able to add new functionality without touching or altering existing, tested code.
• **Violation**: A \`DiscountCalculator\` with a giant \`switch(userType)\` statement (\`case REGULAR:\`, \`case VIP:\`). Adding \`PREMIUM\` requires modifying existing class code!
• **Solution**: Define an interface \`DiscountStrategy\`. Implement \`VipDiscount\`, \`PremiumDiscount\`. Add new customer tiers by creating new classes without touching existing classes!`,
    tags: ['OOPs', 'SOLID', 'OCP', 'Design Patterns'],
  },
  {
    id: 'oop-11',
    deckCategory: 'OOPs',
    front: 'Explain the Liskov Substitution Principle (LSP) in SOLID with the classic Square-Rectangle trap.',
    back: `**Liskov Substitution Principle (LSP)**:
*"Subtypes must be substitutable for their base types without altering the correctness of the program."*
• **Classic Violation (Square inheriting from Rectangle)**:
\`\`\`cpp
class Rectangle {
    virtual void setWidth(int w) { width = w; }
    virtual void setHeight(int h) { height = h; }
};
class Square : public Rectangle {
    void setWidth(int w) override { width = height = w; }
    void setHeight(int h) override { width = height = h; }
};
\`\`\`
If a client expects a \`Rectangle\`, runs \`r->setWidth(5); r->setHeight(10);\`, and asserts \`area == 50\`, the code fails for \`Square\` (area becomes 100)!
*Square is mathematically a rectangle, but NOT behaviorally in software!*`,
    tags: ['OOPs', 'SOLID', 'LSP', 'Antipattern'],
  },
  {
    id: 'oop-12',
    deckCategory: 'OOPs',
    front: 'Explain the Interface Segregation Principle (ISP) in SOLID.',
    back: `**Interface Segregation Principle (ISP)**:
*"Clients should not be forced to depend on interfaces they do not use."*
• **Violation (Fat Interface)**:
\`\`\`ts
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}
// A RobotWorker class is forced to implement dummy eat() and sleep() methods!
\`\`\`
• **Refactoring**: Split fat interface into smaller, highly cohesive role interfaces:
\`\`\`ts
interface Workable { work(): void; }
interface Feedable { eat(): void; }
// Human implements Workable, Feedable. Robot only implements Workable!
\`\`\``,
    tags: ['OOPs', 'SOLID', 'ISP', 'Clean Code'],
  },
  {
    id: 'oop-13',
    deckCategory: 'OOPs',
    front: 'Explain the Dependency Inversion Principle (DIP) and Dependency Injection (DI).',
    back: `**Dependency Inversion Principle (DIP)**:
1. *High-level modules should not depend on low-level modules. Both should depend on abstractions.*
2. *Abstractions should not depend on details. Details should depend on abstractions.*
• **Dependency Injection (DI)**: A design pattern implementing DIP where an object receives its dependencies from an external injector rather than creating them itself with \`new\`:
\`\`\`ts
// BAD (Tightly coupled):
class UserService {
  private db = new MySQLDatabase(); // Tight coupling!
}
// GOOD (DIP + DI):
class UserService {
  constructor(private db: DatabaseInterface) {} // Injected via interface!
}
\`\`\``,
    tags: ['OOPs', 'SOLID', 'DIP', 'Dependency Injection'],
  },
  {
    id: 'oop-14',
    deckCategory: 'OOPs',
    front: 'Shallow Copy vs Deep Copy: Mechanisms, risks, and implementations.',
    back: `• **Shallow Copy**:
  - Copies the primitive field values directly.
  - For reference fields (pointers, objects, arrays), it **copies only the reference pointer**, NOT the actual heap object.
  - *Risk*: Both original and cloned objects point to the exact same nested data in memory. Mutating a nested array in the copy mutates the original!
• **Deep Copy**:
  - Recursively allocates new memory and copies all objects referenced at every depth.
  - Creates an independent, isolated clone. Changes to copy never affect original.
  - *Cost*: Slower; requires handling circular references.`,
    tags: ['OOPs', 'Shallow Copy', 'Deep Copy', 'Memory'],
  },
  {
    id: 'oop-15',
    deckCategory: 'OOPs',
    front: 'Why should a Base Class Destructor ALWAYS be Virtual in C++?',
    back: `If a base class destructor is non-virtual, deleting a derived class object through a base class pointer causes **Undefined Behavior and Memory Leaks**!
\`\`\`cpp
class Base {
    ~Base() { cout << "Base destroyed"; } // NON-VIRTUAL!
};
class Derived : public Base {
    int* array = new int[1000];
    ~Derived() { delete[] array; cout << "Derived destroyed"; }
};

Base* ptr = new Derived();
delete ptr; // Calls ONLY ~Base()! ~Derived() is never executed!
// Leaks 1000 ints on heap!
\`\`\`
**Fix**: Declare \`virtual ~Base() = default;\`. The compiler uses the VTABLE to invoke the derived destructor first, followed by the base destructor.`,
    tags: ['OOPs', 'C++', 'Virtual Destructor', 'Memory Leaks'],
  },
  {
    id: 'oop-16',
    deckCategory: 'OOPs',
    front: 'What does the static keyword do when applied to variables, methods, and classes?',
    back: `• **Static Variable**: Belongs to the **Class itself**, rather than any specific instance. Stored in the global/static data segment; shared across all instances.
• **Static Method**: Belongs to the class. Can be invoked without creating an instance (\`Math.sqrt()\`).
  - *Constraint*: Cannot access non-static instance fields (\`this\` pointer does not exist in static context).
• **Static Nested Class** (Java): A nested class that does not hold an implicit reference to its enclosing outer class instance, preventing memory leaks.`,
    tags: ['OOPs', 'Static', 'Memory', 'Language Features'],
  },
  {
    id: 'oop-17',
    deckCategory: 'OOPs',
    front: 'Access Specifiers: Public, Protected, Private, and Package-Private.',
    back: `| Access Specifier | Same Class | Subclass (Same Pkg) | Subclass (Diff Pkg) | World (Everywhere) |
|---|---|---|---|---|
| **Private** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Package-Private (Default)** | ✅ Yes | ✅ Yes | ❌ No | ❌ No |
| **Protected** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Public** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |`,
    tags: ['OOPs', 'Access Specifiers', 'Encapsulation'],
  },
  {
    id: 'oop-18',
    deckCategory: 'OOPs',
    front: 'Explain the Singleton Design Pattern: Implementation & Thread Safety.',
    back: `Ensures a class has **only one instance** and provides a global point of access to it.
**Thread-Safe Double-Checked Locking (Java/C++)**:
\`\`\`java
public class Singleton {
    private static volatile Singleton instance;
    private Singleton() {} // Private constructor prevents new
    
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
\`\`\`
*Why volatile is mandatory*: Prevents CPU instruction reordering where instance memory is allocated before object constructor finishes initialization!`,
    tags: ['OOPs', 'Design Patterns', 'Singleton', 'Thread Safety'],
  },
  {
    id: 'oop-19',
    deckCategory: 'OOPs',
    front: 'Factory Method vs Abstract Factory Design Pattern.',
    back: `• **Factory Method**:
  - Defines an interface for creating an object, but lets subclasses decide which concrete class to instantiate.
  - Relies on **Inheritance**.
  - Creates **one product** (e.g. \`createButton()\`).
• **Abstract Factory**:
  - Provides an interface for creating **families of related or dependent objects** without specifying their concrete classes.
  - Relies on **Composition**.
  - Creates **multiple related products** (e.g. \`GUIFactory\` with \`createButton()\`, \`createCheckbox()\`, \`createScrollbar()\` for Windows vs Mac).`,
    tags: ['OOPs', 'Design Patterns', 'Factory', 'Creational Patterns'],
  },
  {
    id: 'oop-20',
    deckCategory: 'OOPs',
    front: 'Explain the Observer Design Pattern with real-world examples.',
    back: `Defines a one-to-many dependency between objects such that when one object (**Subject**) changes state, all its dependents (**Observers**) are notified and updated automatically.
• **Components**:
  - \`Subject\`: Maintains list of observers; provides \`subscribe()\`, \`unsubscribe()\`, \`notifyObservers()\`.
  - \`Observer\`: Interface defining \`update(data)\`.
• **Real-World Examples**:
  - Event listeners in JavaScript DOM (\`addEventListener\`).
  - Pub/Sub message channels (Kafka, Redis PubSub).
  - Reactive frameworks (RxJS, State management in React/Redux).`,
    tags: ['OOPs', 'Design Patterns', 'Observer', 'Behavioral Patterns'],
  },
  {
    id: 'oop-21',
    deckCategory: 'OOPs',
    front: 'Explain the Strategy Design Pattern.',
    back: `Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.
• **Components**:
  - \`Strategy Interface\`: \`PaymentStrategy\` with \`pay(amount)\`.
  - \`Concrete Strategies\`: \`CreditCardPayment\`, \`PayPalPayment\`, \`CryptoPayment\`.
  - \`Context\`: \`ShoppingCart\` holding a reference to \`PaymentStrategy\`.
• **Benefit**: Completely eliminates giant conditional statements (\`if-else\`, \`switch\`) and adheres to Open/Closed Principle.`,
    tags: ['OOPs', 'Design Patterns', 'Strategy', 'Clean Code'],
  },
  {
    id: 'oop-22',
    deckCategory: 'OOPs',
    front: 'Explain the Adapter Design Pattern.',
    back: `Converts the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces (Wrapper).
• **Example**:
  - Client expects \`LightningPort\`.
  - Service provides \`USB_C_Device\`.
  - \`USB_C_To_LightningAdapter\` implements \`LightningPort\` and internally delegates calls to the wrapped \`USB_C_Device\`.`,
    tags: ['OOPs', 'Design Patterns', 'Adapter', 'Structural Patterns'],
  },
  {
    id: 'oop-23',
    deckCategory: 'OOPs',
    front: 'Explain the Decorator Design Pattern vs Subclassing.',
    back: `Attaches additional responsibilities to an object **dynamically at runtime**. Decorators provide a flexible alternative to subclassing for extending functionality.
• **Why prefer Decorator over Subclassing**:
  - Subclassing is static at compile time. If you have 3 features (Milk, Sugar, Caramel) on a Coffee class, subclassing creates $2^3 = 8$ classes (\`MilkCoffee\`, \`MilkSugarCoffee\`, etc.).
  - Decorator wraps objects recursively: \`new MilkDecorator(new SugarDecorator(new SimpleCoffee()))\`.`,
    tags: ['OOPs', 'Design Patterns', 'Decorator', 'Structural Patterns'],
  },
  {
    id: 'oop-24',
    deckCategory: 'OOPs',
    front: 'How do you create an Immutable Class in Java / C++ / TypeScript?',
    back: `An immutable object cannot have its state modified after creation.
**Rules to create Immutable Class (e.g. Java String)**:
1. Declare the class as \`final\` (prevents subclassing).
2. Make all fields \`private\` and \`final\`.
3. Provide NO setter methods.
4. If fields reference mutable objects (e.g. \`Date\`, \`ArrayList\`), perform **defensive copying** in constructor and return clones in getters.
**Benefits**: Inherently thread-safe, no synchronization needed, ideal for Hash Map keys.`,
    tags: ['OOPs', 'Immutability', 'Thread Safety', 'Java'],
  },
  {
    id: 'oop-25',
    deckCategory: 'OOPs',
    front: 'Explain Garbage Collection: Mark-and-Sweep, Generational GC, and Reference Counting.',
    back: `• **Reference Counting** (Python, Objective-C):
  - Every object tracks how many references point to it. When count reaches 0, memory is freed immediately.
  - *Pitfall*: Circular references ($A \\to B \\to A$) leak memory!
• **Tracing GC (Mark-and-Sweep)**:
  - Phase 1 (Mark): Starts from **GC Roots** (stack variables, static references) and traverses object graph, marking all reachable objects.
  - Phase 2 (Sweep): Reclaims memory of all unmarked objects.
• **Generational GC** (JVM, V8):
  - Based on the **Weak Generational Hypothesis**: *Most objects die young!*
  - Splits heap into **Young Generation** (Eden + Survivor spaces) and **Old / Tenured Generation**.
  - Minor GC runs frequently and rapidly on Young Gen; surviving objects get promoted to Old Gen where Major GC runs rarely.`,
    tags: ['OOPs', 'Garbage Collection', 'Memory Management', 'JVM'],
  },
  {
    id: 'oop-26',
    deckCategory: 'OOPs',
    front: 'Explain RAII (Resource Acquisition Is Initialization) and C++ Smart Pointers.',
    back: `**RAII** is an idiom where resource lifecycle is bound to the lifetime of an object with automatic storage duration (stack):
- Resource is acquired in constructor.
- Resource is automatically released in destructor when object goes out of scope (even on exceptions!).
**C++ Smart Pointers**:
1. \`std::unique_ptr\`: Exclusive ownership. Cannot be copied, only moved. Destructor frees memory.
2. \`std::shared_ptr\`: Shared ownership using atomic reference counting. Destructor frees memory when ref count hits 0.
3. \`std::weak_ptr\`: Non-owning observer of \`shared_ptr\` that breaks circular reference cycles.`,
    tags: ['OOPs', 'C++', 'RAII', 'Smart Pointers', 'Memory Management'],
  },
  {
    id: 'oop-27',
    deckCategory: 'OOPs',
    front: 'High Cohesion and Low Coupling: Explain software architecture metrics.',
    back: `• **Cohesion**: The degree to which elements inside a module or class belong together.
  - **High Cohesion (Good)**: A class has a clear, focused responsibility and all its methods contribute directly to that single purpose.
• **Coupling**: The degree of interdependence between software modules.
  - **Low Coupling (Good)**: Classes interact via abstract interfaces; changing one class does not break others.
• *Golden Rule of Architecture: High Cohesion + Low Coupling = Maintainable, testable, robust software.*`,
    tags: ['OOPs', 'Cohesion', 'Coupling', 'Software Engineering'],
  },
  {
    id: 'oop-28',
    deckCategory: 'OOPs',
    front: 'What are Covariant Return Types in Object-Oriented Languages?',
    back: `**Covariant Return Types** allow an overriding method in a subclass to return a **more derived (subclass) type** than the return type declared in the superclass method!
\`\`\`java
class Animal {
    Animal reproduce() { return new Animal(); }
}
class Dog extends Animal {
    @Override
    Dog reproduce() { return new Dog(); } // Valid Covariant Return!
}
\`\`\`
Eliminates tedious manual type-casting on caller side while preserving type safety.`,
    tags: ['OOPs', 'Covariant Return', 'Polymorphism', 'Type System'],
  },
  {
    id: 'oop-29',
    deckCategory: 'OOPs',
    front: 'Friend Class and Friend Function in C++: Purpose, syntax, and risks.',
    back: `In C++, a **\`friend\`** function or class is granted access to the \`private\` and \`protected\` members of another class:
\`\`\`cpp
class Box {
private:
    double width;
public:
    friend void printWidth(Box& b); // Friend function
    friend class BoxManager;        // Friend class
};
void printWidth(Box& b) {
    cout << b.width; // Allowed access to private member!
}
\`\`\`
• **Characteristics**: Friendship is **neither inherited nor transitive**!
• **Risk**: Violates encapsulation; should be used sparingly (e.g. for overloaded stream operators \`operator<<\`).`,
    tags: ['OOPs', 'C++', 'Friend Function', 'Encapsulation'],
  },
  {
    id: 'oop-30',
    deckCategory: 'OOPs',
    front: 'Delegation Pattern vs Proxy Pattern: Contrasting intent and implementation.',
    back: `• **Delegation Pattern**: An object handles a request by delegating to a second helper object ("Delegation over Inheritance").
• **Proxy Pattern**: Provides a surrogate or placeholder for another object to **control access** to it.
  - *Virtual Proxy*: Lazy-loads expensive objects on demand.
  - *Protection Proxy*: Validates authentication/authorization before invoking real object.
  - *Remote Proxy*: Encapsulates network RPC serialization (e.g. gRPC stub).`,
    tags: ['OOPs', 'Design Patterns', 'Proxy', 'Delegation'],
  },
];
