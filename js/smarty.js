/**
 * Smarty Pants Widget - hyprZona
 * A floating help widget with personality
 */

class SmartyPantsWidget {
  constructor() {
    this.isOpen = false;
    this.activeTab = 'how-to';
    this.clickCount = 0;
    this.clickTimer = null;
    this.pulseTimer = null;
    this.currentQuoteIndex = 0;
    this.inactivityTimer = null;
    this.lastInteractionTime = Date.now();
    
    // Smarty quotes collection
    this.quotes = [
      "If you're not embarrassed by your first website, you waited too long to launch.",
      "There are only two hard things in Computer Science: cache invalidation and naming things.",
      "Code is like humor. When you have to explain it, it's bad.",
      "Programming is the art of telling another human being what one wants the computer to do.",
      "The best error message is the one that never shows up.",
      "Debugging is twice as hard as writing the code in the first place.",
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      "First, solve the problem. Then, write the code.",
      "Experience is the name everyone gives to their mistakes.",
      "The most important property of a program is whether it accomplishes the intention of its user.",
      "Simplicity is the ultimate sophistication.",
      "Make it work, make it right, make it fast.",
      "Programs must be written for people to read, and only incidentally for machines to execute.",
      "The computer was born to solve problems that did not exist before.",
      "Software is like entropy: It is difficult to grasp, weighs nothing, and obeys the Second Law of Thermodynamics.",
      "Never forget, code doesn't lie, but comments sure do.",
  "It's simple, semicolons are like punctuation for robots—forget one, regret everything.",
  "As dVlpr once said, if it works on your machine, it's your machine's fault.",
  "Never forget, refactoring is just procrastination disguised as productivity.",
  "Never forget, backend devs be like: ‘it works on my API’",
  "Fun fact: naming variables is a spiritual journey.",
  "Always remember, every time you debug, an angel loses its wings.",
  "As dVlpr once said, semicolons are like punctuation for robots—forget one, regret everything.",
  "Unpopular opinion: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Always remember, refactoring is just procrastination disguised as productivity.",
  "As dVlpr once said, refactoring is just procrastination disguised as productivity.",
  "Fun fact: semicolons are like punctuation for robots—forget one, regret everything.",
  "Just between us nerds, backend devs be like: ‘it works on my API’",
  "It's simple, code doesn't lie, but comments sure do.",
  "The truth is, if at first you don’t succeed, blame the syntax.",
  "Pro tip: naming variables is a spiritual journey.",
  "As dVlpr once said, hotfixes are just bug-wrapped bugs.",
  "As dVlpr once said, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "It's simple, code doesn't lie, but comments sure do.",
  "Unpopular opinion: hotfixes are just bug-wrapped bugs.",
  "Just between us nerds, semicolons are like punctuation for robots—forget one, regret everything.",
  "Pro tip: refactoring is just procrastination disguised as productivity.",
  "It's simple, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Unpopular opinion: backend devs be like: ‘it works on my API’",
  "Fun fact: backend devs be like: ‘it works on my API’",
  "Unpopular opinion: if it works on your machine, it's your machine's fault.",
  "Pro tip: if it works on your machine, it's your machine's fault.",
  "The truth is, code doesn't lie, but comments sure do.",
  "Simplicity is the ultimate sophistication.",
  "As dVlpr once said, hotfixes are just bug-wrapped bugs.",
  "Unpopular opinion: semicolons are like punctuation for robots—forget one, regret everything.",
  "Always remember, hotfixes are just bug-wrapped bugs.",
  "The truth is, version control: where your past mistakes haunt you in real time.",
  "As dVlpr once said, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Fun fact: version control: where your past mistakes haunt you in real time.",
  "Always remember, naming variables is a spiritual journey.",
  "Always remember, version control: where your past mistakes haunt you in real time.",
  "Pro tip: hotfixes are just bug-wrapped bugs.",
  "Unpopular opinion: version control: where your past mistakes haunt you in real time.",
  "Just between us nerds, refactoring is just procrastination disguised as productivity.",
  "Pro tip: refactoring is just procrastination disguised as productivity.",
  "It's simple, naming variables is a spiritual journey.",
  "Fun fact: backend devs be like: ‘it works on my API’",
  "It's simple, naming variables is a spiritual journey.",
  "Always remember, refactoring is just procrastination disguised as productivity.",
  "Programs must be written for people to read, and only incidentally for machines to execute.",
  "Always remember, semicolons are like punctuation for robots—forget one, regret everything.",
  "As dVlpr once said, version control: where your past mistakes haunt you in real time.",
  "Fun fact: version control: where your past mistakes haunt you in real time.",
  "Pro tip: refactoring is just procrastination disguised as productivity.",
  "Just between us nerds, backend devs be like: ‘it works on my API’",
  "Pro tip: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Unpopular opinion: if it works on your machine, it's your machine's fault.",
  "The truth is, version control: where your past mistakes haunt you in real time.",
  "The truth is, version control: where your past mistakes haunt you in real time.",
  "Unpopular opinion: hotfixes are just bug-wrapped bugs.",
  "Just between us nerds, refactoring is just procrastination disguised as productivity.",
  "The truth is, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Just between us nerds, refactoring is just procrastination disguised as productivity.",
  "It's simple, version control: where your past mistakes haunt you in real time.",
  "Pro tip: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "As dVlpr once said, every time you debug, an angel loses its wings.",
  "Pro tip: code doesn't lie, but comments sure do.",
  "Unpopular opinion: refactoring is just procrastination disguised as productivity.",
  "Unpopular opinion: every time you debug, an angel loses its wings.",
  "Fun fact: technical debt is just a fancy way of saying 'YOLO in code'.",
  "Always remember, version control: where your past mistakes haunt you in real time.",
  "As dVlpr once said, backend devs be like: ‘it works on my API’",
  "Just between us nerds, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Pro tip: version control: where your past mistakes haunt you in real time.",
  "It's simple, refactoring is just procrastination disguised as productivity.",
  "Pro tip: naming variables is a spiritual journey.",
  "Just between us nerds, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Pro tip: refactoring is just procrastination disguised as productivity.",
  "As dVlpr once said, backend devs be like: ‘it works on my API’",
  "Fun fact: every time you debug, an angel loses its wings.",
  "It's simple, if it works on your machine, it's your machine's fault.",
  "Always remember, code doesn't lie, but comments sure do.",
  "Fun fact: technical debt is just a fancy way of saying 'YOLO in code'.",
  "Fun fact: naming variables is a spiritual journey.",
  "Just between us nerds, semicolons are like punctuation for robots—forget one, regret everything.",
  "It's simple, refactoring is just procrastination disguised as productivity.",
  "Fun fact: code doesn't lie, but comments sure do.",
  "Pro tip: if it works on your machine, it's your machine's fault.",
  "Always remember, technical debt is just a fancy way of saying 'YOLO in code'.",
  "It's simple, hotfixes are just bug-wrapped bugs.",
  "It's simple, technical debt is just a fancy way of saying 'YOLO in code'.",
  "As dVlpr once said, version control: where your past mistakes haunt you in real time.",
  "The truth is, code doesn't lie, but comments sure do.",
  "As dVlpr once said, version control: where your past mistakes haunt you in real time.",
  "As dVlpr once said, version control: where your past mistakes haunt you in real time.",
  "Always remember, hotfixes are just bug-wrapped bugs.",
  "As dVlpr once said, backend devs be like: ‘it works on my API’",
  "Fun fact: every time you debug, an angel loses its wings.",
  "Pro tip: version control: where your past mistakes haunt you in real time.",
  "Debugging is twice as hard as writing the code in the first place.",
  "Always remember, technical debt is just a fancy way of saying 'YOLO in code'.",
  "It's simple, technical debt is just a fancy way of saying 'YOLO in code'.",
  "The truth is, if it works on your machine, it's your machine's fault.",
  "If you're not embarrassed by your first website, you waited too long to launch.",
  "Unpopular opinion: every time you debug, an angel loses its wings.",
  "Just between us nerds, every time you debug, an angel loses its wings.",
  "It's simple, if it works on your machine, it's your machine's fault.",
  "The truth is, refactoring is just procrastination disguised as productivity.",
  "It's simple, hotfixes are just bug-wrapped bugs.",
  "Just between us nerds, version control: where your past mistakes haunt you in real time.",
  "Just between us nerds, technical debt is just a fancy way of saying 'YOLO in code'.",
  "It's simple, semicolons are like punctuation for robots—forget one, regret everything.",
  "The truth is, version control: where your past mistakes haunt you in real time.",
  "The truth is, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Unpopular opinion: code doesn't lie, but comments sure do.",
  "Pro tip: every time you debug, an angel loses its wings.",
  "Fun fact: if it works on your machine, it's your machine's fault.",
  "Pro tip: technical debt is just a fancy way of saying 'YOLO in code'.",
  "Always remember, naming variables is a spiritual journey.",
  "Unpopular opinion: backend devs be like: ‘it works on my API’",
  "It's simple, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Pro tip: if it works on your machine, it's your machine's fault.",
  "As dVlpr once said, every time you debug, an angel loses its wings.",
  "Fun fact: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Just between us nerds, if it works on your machine, it's your machine's fault.",
  "Unpopular opinion: technical debt is just a fancy way of saying 'YOLO in code'.",
  "Just between us nerds, backend devs be like: ‘it works on my API’",
  "Just between us nerds, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Just between us nerds, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Fun fact: version control: where your past mistakes haunt you in real time.",
  "Just between us nerds, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Fun fact: naming variables is a spiritual journey.",
  "Pro tip: semicolons are like punctuation for robots—forget one, regret everything.",
  "Unpopular opinion: hotfixes are just bug-wrapped bugs.",
  "It's simple, technical debt is just a fancy way of saying 'YOLO in code'.",
  "As dVlpr once said, version control: where your past mistakes haunt you in real time.",
  "Pro tip: technical debt is just a fancy way of saying 'YOLO in code'.",
  "Pro tip: naming variables is a spiritual journey.",
  "Unpopular opinion: code doesn't lie, but comments sure do.",
  "The truth is, naming variables is a spiritual journey.",
  "Unpopular opinion: code doesn't lie, but comments sure do.",
  "First, solve the problem. Then, write the code.",
  "Software is like entropy: It is difficult to grasp, weighs nothing, and obeys the Second Law of Thermodynamics.",
  "The truth is, every time you debug, an angel loses its wings.",
  "Always remember, semicolons are like punctuation for robots—forget one, regret everything.",
  "Pro tip: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "As dVlpr once said, backend devs be like: ‘it works on my API’",
  "Just between us nerds, refactoring is just procrastination disguised as productivity.",
  "The truth is, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Just between us nerds, refactoring is just procrastination disguised as productivity.",
  "As dVlpr once said, semicolons are like punctuation for robots—forget one, regret everything.",
  "It's simple, hotfixes are just bug-wrapped bugs.",
  "Always remember, semicolons are like punctuation for robots—forget one, regret everything.",
  "Fun fact: version control: where your past mistakes haunt you in real time.",
  "Always remember, refactoring is just procrastination disguised as productivity.",
  "Pro tip: if it works on your machine, it's your machine's fault.",
  "Just between us nerds, technical debt is just a fancy way of saying 'YOLO in code'.",
  "As dVlpr once said, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Always remember, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Just between us nerds, code doesn't lie, but comments sure do.",
  "As dVlpr once said, naming variables is a spiritual journey.",
  "Just between us nerds, technical debt is just a fancy way of saying 'YOLO in code'.",
  "It's simple, if it works on your machine, it's your machine's fault.",
  "Just between us nerds, backend devs be like: ‘it works on my API’",
  "Just between us nerds, if it works on your machine, it's your machine's fault.",
  "Unpopular opinion: technical debt is just a fancy way of saying 'YOLO in code'.",
  "It's simple, every time you debug, an angel loses its wings.",
  "The truth is, hotfixes are just bug-wrapped bugs.",
  "As dVlpr once said, semicolons are like punctuation for robots—forget one, regret everything.",
  "Pro tip: refactoring is just procrastination disguised as productivity.",
  "Fun fact: if it works on your machine, it's your machine's fault.",
  "The truth is, refactoring is just procrastination disguised as productivity.",
  "As dVlpr once said, code doesn't lie, but comments sure do.",
  "Fun fact: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "It's simple, refactoring is just procrastination disguised as productivity.",
  "Just between us nerds, version control: where your past mistakes haunt you in real time.",
  "Unpopular opinion: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Just between us nerds, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Pro tip: refactoring is just procrastination disguised as productivity.",
  "Fun fact: semicolons are like punctuation for robots—forget one, regret everything.",
  "Unpopular opinion: semicolons are like punctuation for robots—forget one, regret everything.",
  "Just between us nerds, technical debt is just a fancy way of saying 'YOLO in code'.",
  "It's simple, technical debt is just a fancy way of saying 'YOLO in code'.",
  "It's simple, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "There are only two hard things in Computer Science: cache invalidation and naming things.",
  "Unpopular opinion: refactoring is just procrastination disguised as productivity.",
  "Always remember, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Fun fact: every time you debug, an angel loses its wings.",
  "Just between us nerds, hotfixes are just bug-wrapped bugs.",
  "Fun fact: every time you debug, an angel loses its wings.",
  "Unpopular opinion: naming variables is a spiritual journey.",
  "The truth is, every time you debug, an angel loses its wings.",
  "Fun fact: version control: where your past mistakes haunt you in real time.",
  "It's simple, semicolons are like punctuation for robots—forget one, regret everything.",
  "Just between us nerds, backend devs be like: ‘it works on my API’",
  "Just between us nerds, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "The truth is, hotfixes are just bug-wrapped bugs.",
  "Fun fact: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Fun fact: hotfixes are just bug-wrapped bugs.",
  "The truth is, hotfixes are just bug-wrapped bugs.",
  "The truth is, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "The truth is, every time you debug, an angel loses its wings.",
  "Always remember, every time you debug, an angel loses its wings.",
  "Just between us nerds, hotfixes are just bug-wrapped bugs.",
  "Fun fact: code doesn't lie, but comments sure do.",
  "Just between us nerds, code doesn't lie, but comments sure do.",
  "Programming is the art of telling another human being what one wants the computer to do.",
  "It's simple, version control: where your past mistakes haunt you in real time.",
  "Fun fact: naming variables is a spiritual journey.",
  "Fun fact: refactoring is just procrastination disguised as productivity.",
  "Just between us nerds, refactoring is just procrastination disguised as productivity.",
  "Fun fact: backend devs be like: ‘it works on my API’",
  "Just between us nerds, if it works on your machine, it's your machine's fault.",
  "Fun fact: backend devs be like: ‘it works on my API’",
  "Always remember, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Always remember, code doesn't lie, but comments sure do.",
  "As dVlpr once said, naming variables is a spiritual journey.",
  "Pro tip: refactoring is just procrastination disguised as productivity.",
  "Fun fact: code doesn't lie, but comments sure do.",
  "Just between us nerds, semicolons are like punctuation for robots—forget one, regret everything.",
  "Pro tip: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Pro tip: every time you debug, an angel loses its wings.",
  "Always remember, semicolons are like punctuation for robots—forget one, regret everything.",
  "As dVlpr once said, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Fun fact: naming variables is a spiritual journey.",
  "Pro tip: hotfixes are just bug-wrapped bugs.",
  "Always remember, version control: where your past mistakes haunt you in real time.",
  "Pro tip: semicolons are like punctuation for robots—forget one, regret everything.",
  "Unpopular opinion: version control: where your past mistakes haunt you in real time.",
  "Just between us nerds, if it works on your machine, it's your machine's fault.",
  "Always remember, code doesn't lie, but comments sure do.",
  "Pro tip: version control: where your past mistakes haunt you in real time.",
  "As dVlpr once said, version control: where your past mistakes haunt you in real time.",
  "As dVlpr once said, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Pro tip: semicolons are like punctuation for robots—forget one, regret everything.",
  "It's simple, hotfixes are just bug-wrapped bugs.",
  "Always remember, semicolons are like punctuation for robots—forget one, regret everything.",
  "Pro tip: semicolons are like punctuation for robots—forget one, regret everything.",
  "Just between us nerds, refactoring is just procrastination disguised as productivity.",
  "Pro tip: every time you debug, an angel loses its wings.",
  "Fun fact: technical debt is just a fancy way of saying 'YOLO in code'.",
  "The truth is, code doesn't lie, but comments sure do.",
  "Fun fact: version control: where your past mistakes haunt you in real time.",
  "Pro tip: version control: where your past mistakes haunt you in real time.",
  "It's simple, if it works on your machine, it's your machine's fault.",
  "Fun fact: technical debt is just a fancy way of saying 'YOLO in code'.",
  "Fun fact: technical debt is just a fancy way of saying 'YOLO in code'.",
  "The truth is, hotfixes are just bug-wrapped bugs.",
  "Pro tip: technical debt is just a fancy way of saying 'YOLO in code'.",
  "Unpopular opinion: refactoring is just procrastination disguised as productivity.",
  "Just between us nerds, naming variables is a spiritual journey.",
  "The truth is, technical debt is just a fancy way of saying 'YOLO in code'.",
  "As dVlpr once said, version control: where your past mistakes haunt you in real time.",
  "Always remember, semicolons are like punctuation for robots—forget one, regret everything.",
  "Unpopular opinion: version control: where your past mistakes haunt you in real time.",
  "The truth is, hotfixes are just bug-wrapped bugs.",
  "Fun fact: semicolons are like punctuation for robots—forget one, regret everything.",
  "Always remember, version control: where your past mistakes haunt you in real time.",
  "As dVlpr once said, hotfixes are just bug-wrapped bugs.",
  "Unpopular opinion: refactoring is just procrastination disguised as productivity.",
  "Always remember, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Unpopular opinion: technical debt is just a fancy way of saying 'YOLO in code'.",
  "Just between us nerds, code doesn't lie, but comments sure do.",
  "The truth is, code doesn't lie, but comments sure do.",
  "Always remember, refactoring is just procrastination disguised as productivity.",
  "Unpopular opinion: every time you debug, an angel loses its wings.",
  "Pro tip: naming variables is a spiritual journey.",
  "Unpopular opinion: every time you debug, an angel loses its wings.",
  "Pro tip: if it works on your machine, it's your machine's fault.",
  "It's simple, code doesn't lie, but comments sure do.",
  "Pro tip: technical debt is just a fancy way of saying 'YOLO in code'.",
  "Always remember, naming variables is a spiritual journey.",
  "The truth is, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "The truth is, hotfixes are just bug-wrapped bugs.",
  "Code is like humor. When you have to explain it, it's bad.",
  "Pro tip: version control: where your past mistakes haunt you in real time.",
  "Unpopular opinion: hotfixes are just bug-wrapped bugs.",
  "Just between us nerds, technical debt is just a fancy way of saying 'YOLO in code'.",
  "It's simple, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Pro tip: backend devs be like: ‘it works on my API’",
  "Unpopular opinion: backend devs be like: ‘it works on my API’",
  "It's simple, refactoring is just procrastination disguised as productivity.",
  "Pro tip: naming variables is a spiritual journey.",
  "Fun fact: hotfixes are just bug-wrapped bugs.",
  "Just between us nerds, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Fun fact: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Fun fact: version control: where your past mistakes haunt you in real time.",
  "It's simple, if it works on your machine, it's your machine's fault.",
  "Unpopular opinion: version control: where your past mistakes haunt you in real time.",
  "The truth is, backend devs be like: ‘it works on my API’",
  "The truth is, hotfixes are just bug-wrapped bugs.",
  "Just between us nerds, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Just between us nerds, hotfixes are just bug-wrapped bugs.",
  "Pro tip: naming variables is a spiritual journey.",
  "The truth is, refactoring is just procrastination disguised as productivity.",
  "The truth is, every time you debug, an angel loses its wings.",
  "Just between us nerds, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Always remember, hotfixes are just bug-wrapped bugs.",
  "Unpopular opinion: naming variables is a spiritual journey.",
  "Just between us nerds, backend devs be like: ‘it works on my API’",
  "As dVlpr once said, technical debt is just a fancy way of saying 'YOLO in code'.",
  "It's simple, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Just between us nerds, every time you debug, an angel loses its wings.",
  "As dVlpr once said, naming variables is a spiritual journey.",
  "As dVlpr once said, version control: where your past mistakes haunt you in real time.",
  "Fun fact: hotfixes are just bug-wrapped bugs.",
  "It's simple, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "As dVlpr once said, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Just between us nerds, code doesn't lie, but comments sure do.",
  "Unpopular opinion: semicolons are like punctuation for robots—forget one, regret everything.",
  "As dVlpr once said, naming variables is a spiritual journey.",
  "Always remember, every time you debug, an angel loses its wings.",
  "Fun fact: version control: where your past mistakes haunt you in real time.",
  "Just between us nerds, backend devs be like: ‘it works on my API’",
  "It's simple, code doesn't lie, but comments sure do.",
  "Unpopular opinion: hotfixes are just bug-wrapped bugs.",
  "Unpopular opinion: naming variables is a spiritual journey.",
  "Always remember, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Fun fact: refactoring is just procrastination disguised as productivity.",
  "As dVlpr once said, refactoring is just procrastination disguised as productivity.",
  "Unpopular opinion: code doesn't lie, but comments sure do.",
  "As dVlpr once said, technical debt is just a fancy way of saying 'YOLO in code'.",
  "It's simple, if it works on your machine, it's your machine's fault.",
  "Pro tip: naming variables is a spiritual journey.",
  "Always remember, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Fun fact: refactoring is just procrastination disguised as productivity.",
  "It's simple, version control: where your past mistakes haunt you in real time.",
  "It's simple, refactoring is just procrastination disguised as productivity.",
  "It's simple, code doesn't lie, but comments sure do.",
  "The truth is, if it works on your machine, it's your machine's fault.",
  "Just between us nerds, every time you debug, an angel loses its wings.",
  "As dVlpr once said, every time you debug, an angel loses its wings.",
  "Fun fact: hotfixes are just bug-wrapped bugs.",
  "Pro tip: refactoring is just procrastination disguised as productivity.",
  "Fun fact: every time you debug, an angel loses its wings.",
  "Unpopular opinion: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Just between us nerds, naming variables is a spiritual journey.",
  "Just between us nerds, refactoring is just procrastination disguised as productivity.",
  "Always remember, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "It's simple, if it works on your machine, it's your machine's fault.",
  "Pro tip: semicolons are like punctuation for robots—forget one, regret everything.",
  "It's simple, hotfixes are just bug-wrapped bugs.",
  "Just between us nerds, code doesn't lie, but comments sure do.",
  "Just between us nerds, semicolons are like punctuation for robots—forget one, regret everything.",
  "Just between us nerds, code doesn't lie, but comments sure do.",
  "As dVlpr once said, hotfixes are just bug-wrapped bugs.",
  "Just between us nerds, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Pro tip: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Unpopular opinion: code doesn't lie, but comments sure do.",
  "Unpopular opinion: code doesn't lie, but comments sure do.",
  "As dVlpr once said, semicolons are like punctuation for robots—forget one, regret everything.",
  "The most important property of a program is whether it accomplishes the intention of its user.",
  "Unpopular opinion: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "As dVlpr once said, refactoring is just procrastination disguised as productivity.",
  "Always remember, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Pro tip: code doesn't lie, but comments sure do.",
  "Always remember, naming variables is a spiritual journey.",
  "Always remember, hotfixes are just bug-wrapped bugs.",
  "Pro tip: backend devs be like: ‘it works on my API’",
  "Just between us nerds, hotfixes are just bug-wrapped bugs.",
  "Always remember, refactoring is just procrastination disguised as productivity.",
  "Just between us nerds, code doesn't lie, but comments sure do.",
  "Fun fact: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Always remember, naming variables is a spiritual journey.",
  "It's simple, refactoring is just procrastination disguised as productivity.",
  "Always remember, hotfixes are just bug-wrapped bugs.",
  "Pro tip: refactoring is just procrastination disguised as productivity.",
  "Just between us nerds, if it works on your machine, it's your machine's fault.",
  "It's simple, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Always remember, technical debt is just a fancy way of saying 'YOLO in code'.",
  "As dVlpr once said, backend devs be like: ‘it works on my API’",
  "It's simple, code doesn't lie, but comments sure do.",
  "Just between us nerds, technical debt is just a fancy way of saying 'YOLO in code'.",
  "The computer was born to solve problems that did not exist before.",
  "Always remember, every time you debug, an angel loses its wings.",
  "Unpopular opinion: semicolons are like punctuation for robots—forget one, regret everything.",
  "Fun fact: code doesn't lie, but comments sure do.",
  "The truth is, code doesn't lie, but comments sure do.",
  "Fun fact: semicolons are like punctuation for robots—forget one, regret everything.",
  "The truth is, version control: where your past mistakes haunt you in real time.",
  "Unpopular opinion: refactoring is just procrastination disguised as productivity.",
  "It's simple, refactoring is just procrastination disguised as productivity.",
  "Just between us nerds, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Experience is the name everyone gives to their mistakes.",
  "It's simple, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "It's simple, naming variables is a spiritual journey.",
  "Pro tip: if it works on your machine, it's your machine's fault.",
  "Always remember, backend devs be like: ‘it works on my API’",
  "It's simple, hotfixes are just bug-wrapped bugs.",
  "Always remember, naming variables is a spiritual journey.",
  "Fun fact: naming variables is a spiritual journey.",
  "Unpopular opinion: backend devs be like: ‘it works on my API’",
  "Pro tip: backend devs be like: ‘it works on my API’",
  "Fun fact: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Pro tip: version control: where your past mistakes haunt you in real time.",
  "Just between us nerds, hotfixes are just bug-wrapped bugs.",
  "Unpopular opinion: if it works on your machine, it's your machine's fault.",
  "Fun fact: technical debt is just a fancy way of saying 'YOLO in code'.",
  "Pro tip: every time you debug, an angel loses its wings.",
  "Unpopular opinion: code doesn't lie, but comments sure do.",
  "As dVlpr once said, refactoring is just procrastination disguised as productivity.",
  "Just between us nerds, hotfixes are just bug-wrapped bugs.",
  "Just between us nerds, code doesn't lie, but comments sure do.",
  "Unpopular opinion: backend devs be like: ‘it works on my API’",
  "Always remember, hotfixes are just bug-wrapped bugs.",
  "It's simple, code doesn't lie, but comments sure do.",
  "Pro tip: version control: where your past mistakes haunt you in real time.",
  "It's simple, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Fun fact: technical debt is just a fancy way of saying 'YOLO in code'.",
  "Fun fact: version control: where your past mistakes haunt you in real time.",
  "The truth is, every time you debug, an angel loses its wings.",
  "Just between us nerds, if it works on your machine, it's your machine's fault.",
  "Pro tip: naming variables is a spiritual journey.",
  "It's simple, version control: where your past mistakes haunt you in real time.",
  "Fun fact: if it works on your machine, it's your machine's fault.",
  "Unpopular opinion: technical debt is just a fancy way of saying 'YOLO in code'.",
  "Fun fact: code doesn't lie, but comments sure do.",
  "Just between us nerds, semicolons are like punctuation for robots—forget one, regret everything.",
  "As dVlpr once said, if it works on your machine, it's your machine's fault.",
  "Always remember, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Unpopular opinion: code doesn't lie, but comments sure do.",
  "Just between us nerds, version control: where your past mistakes haunt you in real time.",
  "Just between us nerds, refactoring is just procrastination disguised as productivity.",
  "It's simple, naming variables is a spiritual journey.",
  "As dVlpr once said, naming variables is a spiritual journey.",
  "Fun fact: refactoring is just procrastination disguised as productivity.",
  "It's simple, hotfixes are just bug-wrapped bugs.",
  "As dVlpr once said, technical debt is just a fancy way of saying 'YOLO in code'.",
  "As dVlpr once said, technical debt is just a fancy way of saying 'YOLO in code'.",
  "The truth is, backend devs be like: ‘it works on my API’",
  "Just between us nerds, backend devs be like: ‘it works on my API’",
  "It's simple, code doesn't lie, but comments sure do.",
  "As dVlpr once said, code doesn't lie, but comments sure do.",
  "The truth is, naming variables is a spiritual journey.",
  "Unpopular opinion: if it works on your machine, it's your machine's fault.",
  "As dVlpr once said, version control: where your past mistakes haunt you in real time.",
  "Unpopular opinion: hotfixes are just bug-wrapped bugs.",
  "As dVlpr once said, hotfixes are just bug-wrapped bugs.",
  "Fun fact: naming variables is a spiritual journey.",
  "The truth is, hotfixes are just bug-wrapped bugs.",
  "Unpopular opinion: semicolons are like punctuation for robots—forget one, regret everything.",
  "Always remember, hotfixes are just bug-wrapped bugs.",
  "Just between us nerds, refactoring is just procrastination disguised as productivity.",
  "The truth is, naming variables is a spiritual journey.",
  "It's simple, every time you debug, an angel loses its wings.",
  "It's simple, every time you debug, an angel loses its wings.",
  "It's simple, refactoring is just procrastination disguised as productivity.",
  "It's simple, backend devs be like: ‘it works on my API’",
  "Fun fact: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Unpopular opinion: technical debt is just a fancy way of saying 'YOLO in code'.",
  "Just between us nerds, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Fun fact: every time you debug, an angel loses its wings.",
  "Fun fact: if it works on your machine, it's your machine's fault.",
  "Just between us nerds, backend devs be like: ‘it works on my API’",
  "The truth is, every time you debug, an angel loses its wings.",
  "As dVlpr once said, backend devs be like: ‘it works on my API’",
  "It's simple, hotfixes are just bug-wrapped bugs.",
  "Just between us nerds, every time you debug, an angel loses its wings.",
  "The best error message is the one that never shows up.",
  "Pro tip: version control: where your past mistakes haunt you in real time.",
  "Always remember, naming variables is a spiritual journey.",
  "Just between us nerds, hotfixes are just bug-wrapped bugs.",
  "Always remember, every time you debug, an angel loses its wings.",
  "Unpopular opinion: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Fun fact: hotfixes are just bug-wrapped bugs.",
  "Just between us nerds, code doesn't lie, but comments sure do.",
  "As dVlpr once said, naming variables is a spiritual journey.",
  "Fun fact: technical debt is just a fancy way of saying 'YOLO in code'.",
  "The truth is, hotfixes are just bug-wrapped bugs.",
  "It's simple, semicolons are like punctuation for robots—forget one, regret everything.",
  "Pro tip: refactoring is just procrastination disguised as productivity.",
  "Unpopular opinion: naming variables is a spiritual journey.",
  "The truth is, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Always remember, code doesn't lie, but comments sure do.",
  "Unpopular opinion: every time you debug, an angel loses its wings.",
  "Just between us nerds, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Unpopular opinion: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Unpopular opinion: frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Make it work, make it right, make it fast.",
  "The truth is, naming variables is a spiritual journey.",
  "Always remember, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Unpopular opinion: technical debt is just a fancy way of saying 'YOLO in code'.",
  "Unpopular opinion: code doesn't lie, but comments sure do.",
  "Pro tip: refactoring is just procrastination disguised as productivity.",
  "Unpopular opinion: naming variables is a spiritual journey.",
  "Unpopular opinion: refactoring is just procrastination disguised as productivity.",
  "As dVlpr once said, code doesn't lie, but comments sure do.",
  "The truth is, semicolons are like punctuation for robots—forget one, regret everything.",
  "The truth is, technical debt is just a fancy way of saying 'YOLO in code'.",
  "Pro tip: every time you debug, an angel loses its wings.",
  "Always remember, hotfixes are just bug-wrapped bugs.",
  "Just between us nerds, refactoring is just procrastination disguised as productivity.",
  "Just between us nerds, every time you debug, an angel loses its wings.",
  "Just between us nerds, hotfixes are just bug-wrapped bugs.",
  "As dVlpr once said, technical debt is just a fancy way of saying 'YOLO in code'.",
  "It's simple, every time you debug, an angel loses its wings.",
  "The truth is, refactoring is just procrastination disguised as productivity.",
  "Just between us nerds, refactoring is just procrastination disguised as productivity.",
  "Unpopular opinion: code doesn't lie, but comments sure do.",
  "Fun fact: if it works on your machine, it's your machine's fault.",
  "As dVlpr once said, version control: where your past mistakes haunt you in real time.",
  "Just between us nerds, refactoring is just procrastination disguised as productivity.",
  "Just between us nerds, semicolons are like punctuation for robots—forget one, regret everything.",
  "Just between us nerds, version control: where your past mistakes haunt you in real time.",
  "As dVlpr once said, naming variables is a spiritual journey.",
  "As dVlpr once said, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Pro tip: backend devs be like: ‘it works on my API’",
  "As dVlpr once said, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Unpopular opinion: hotfixes are just bug-wrapped bugs.",
  "As dVlpr once said, technical debt is just a fancy way of saying 'YOLO in code'.",
  "It's simple, semicolons are like punctuation for robots—forget one, regret everything.",
  "It's simple, frontend devs: making things pretty until it’s ugly in Internet Explorer.",
  "Pro tip: refactoring is just procrastination disguised as productivity.",
  "Unpopular opinion: refactoring is just procrastination disguised as productivity.",
  "The truth is, version control: where your past mistakes haunt you in real time.",
  "Unpopular opinion: technical debt is just a fancy way of saying 'YOLO in code'.",
  "It's simple, semicolons are like punctuation for robots—forget one, regret everything.",
  "The truth is, semicolons are like punctuation for robots—forget one, regret everything."
    ];

    // Initialize sounds using soundjay links
    this.sounds = {
      click: 'https://www.soundjay.com/buttons/button-09a.wav',
      open: 'https://www.soundjay.com/buttons/button-21.wav',
      close: 'https://www.soundjay.com/buttons/button-7.wav',
      hover: 'https://www.soundjay.com/buttons/button-10.wav'
    };

    // Enable/disable sound preference
    this.soundEnabled = localStorage.getItem('smartyPantsSoundEnabled') !== 'false';

    // Add auto-open preference
    this.autoOpenEnabled = localStorage.getItem('smartyPantsAutoOpen') !== 'false';

    this.init();
  }

  init() {
    this.createWidget();
    this.bindEvents();
    this.startPulseTimer();
    this.loadClickCount();
    this.initializeQuote();
    
    // Immediate auto-open if enabled
    if (this.autoOpenEnabled && !this.isOpen) {
      this.openPanel();
    }

    // Setup inactivity tracking
    this.setupInactivityTracking();
    
    // Add console easter eggs
    this.addConsoleEasterEggs();
  }

  createWidget() {
    // Check if widget already exists
    if (document.getElementById('smarty-widget')) {
      return;
    }

    // Create the widget HTML structure
    const widgetHTML = `
      <div id="smarty-widget" class="smarty-widget" role="complementary" aria-label="Help widget">
        <button id="smarty-button" class="smarty-button" aria-label="Open help menu" title="Need help, genius?">
          <div class="hamburger-icon">
            <div class="hamburger-line"></div>
            <div class="hamburger-line"></div>
            <div class="hamburger-line"></div>
            <div class="smarty-glasses">
              <div class="glass-left"></div>
              <div class="glass-right"></div>
              <div class="bridge"></div>
            </div>
          </div>
          <div class="notification-dot" id="notification-dot" aria-hidden="true"></div>
        </button>

        <div id="smarty-panel" class="smarty-panel" role="dialog" aria-labelledby="panel-title" aria-hidden="true">
          <div class="panel-header">
            <h2 id="panel-title" class="panel-title">
              <span class="logo">hypr</span><span class="logo-accent">Zona</span> Smarty Pants
            </h2>
            <button id="close-panel" class="close-button" aria-label="Close help panel">
              <span class="close-icon">&times;</span>
            </button>
          </div>

          <div class="panel-content">
            <nav class="tab-nav" role="tablist">
              <button class="tab-button active" role="tab" aria-selected="true" data-tab="how-to" id="tab-how-to">
                🚀 How to Use
              </button>
              <button class="tab-button" role="tab" aria-selected="false" data-tab="faq" id="tab-faq">
                🤔 FAQ
              </button>
              <button class="tab-button" role="tab" aria-selected="false" data-tab="contact" id="tab-contact">
                💬 Contact
              </button>
              <button class="tab-button" role="tab" aria-selected="false" data-tab="easter" id="tab-easter">
                🥚 Fun Stuff
              </button>
            </nav>

            <div class="tab-content-container">
              ${this.getTabContent()}
            </div>
          </div>
        </div>

        <div id="smarty-overlay" class="smarty-overlay" aria-hidden="true"></div>
      </div>
    `;

    // Insert widget into page
    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    // Add auto-open toggle to panel header
    const panelHeader = document.querySelector('.panel-header');
    const autoOpenToggle = document.createElement('button');
    autoOpenToggle.className = 'auto-open-toggle';
    autoOpenToggle.innerHTML = this.autoOpenEnabled ? '🔄' : '⏸️';
    autoOpenToggle.title = this.autoOpenEnabled ? 'Disable auto-open' : 'Enable auto-open';
    
    autoOpenToggle.onclick = () => {
      this.autoOpenEnabled = !this.autoOpenEnabled;
      localStorage.setItem('smartyPantsAutoOpen', this.autoOpenEnabled);
      autoOpenToggle.innerHTML = this.autoOpenEnabled ? '🔄' : '⏸️';
      autoOpenToggle.title = this.autoOpenEnabled ? 'Disable auto-open' : 'Enable auto-open';
      this.playSound('click');
    };

    panelHeader.insertBefore(autoOpenToggle, panelHeader.lastChild);
  }

  getTabContent() {
    return `
      <div class="tab-content active" id="content-how-to" role="tabpanel" aria-labelledby="tab-how-to">
  <div class="content-section">
    <h3>🚀 How to Not Be a Noob Here</h3>
    <p>Welcome to <strong>hyprZona</strong> — not your grandma’s portfolio. Here’s how to not embarrass yourself while you’re here:</p>

    <div class="step-item">
      <span class="step-number">01</span>
      <div class="step-content">
        <h4>👀 Know About hyprZona</h4>
        <p>Don't just lurk. Hit the nav menu, slam that <strong>About hyprZona</strong> button, and actually *learn* what this universe is. Lazy scrolling won't cut it here, baby.</p>
      </div>
    </div>

    <div class="step-item">
      <span class="step-number">02</span>
      <div class="step-content">
        <h4>🙏 Pay Your Respects to the deVeloper(s)</h4>
        <p>Don’t be that disrespectful gremlin who bounces without knowing the mastermind(s) behind the chaos. Go check the <strong>Creator(s)</strong> tab. It's literally manners, bruh.</p>
      </div>
    </div>

    <div class="step-item">
      <span class="step-number">03</span>
      <div class="step-content">
        <h4>🪐 Explore Our Timeline</h4>
        <p>Like MCU, DCU, or any other *Confusing Cinematic Universe*, we’ve got our own freaky timeline. The projects might not connect directly, but trust me—they vibe. Go on, take the lore tour.</p>
      </div>
    </div>

    <div class="step-item">
      <span class="step-number">04</span>
      <div class="step-content">
        <h4>📰 News & Other Bogus</h4>
        <p>Whenever stuff drops (which won’t be as hard as dVlpr), you’ll find it here. Could be updates, could be rants, could be cat memes—we don’t know either. Stay tuned or be clueless, your choice.</p>
      </div>
    </div>

    <div class="pro-tip">
      <span class="tip-icon">💡</span>
      <strong>Pro Tip:</strong> Use keyboard shortcuts when available. We reward efficiency and extra brain cells.
    </div>
  </div>
</div>

      <!-- FAQ Tab -->
      <div class="tab-content" id="content-faq" role="tabpanel" aria-labelledby="tab-faq">
  <div class="content-section">
    <h3>🤓 Frequently Asked Questions</h3>
    
    <div class="faq-item">
      <button class="faq-question" aria-expanded="false">
        <span>What if I break something? 🤷‍♀️</span>
        <span class="faq-arrow">▼</span>
      </button>
      <div class="faq-answer">
        <p>Congrats, you’re officially a developer. 🧑‍💻 Welcome to the dark side—we've got cookies, anxiety, and 17 tabs open at once. 🍪☕</p>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-question" aria-expanded="false">
        <span>Why is this site so damn neon? 🌈</span>
        <span class="faq-arrow">▼</span>
      </button>
      <div class="faq-answer">
        <p>Because the creator bathes in neon and whispers sweet nothings to LED strips at 3AM. Also, regular colors are for normies. Neon is science. 🔬✨</p>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-question" aria-expanded="false">
        <span>Is this site haunted? 👻</span>
        <span class="faq-arrow">▼</span>
      </button>
      <div class="faq-answer">
        <p>Only by my past CSS decisions. Sometimes they whisper <code>!important</code> in the shadows. Spooky, right?</p>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-question" aria-expanded="false">
        <span>Why are some sections not opening? 🚧</span>
        <span class="faq-arrow">▼</span>
      </button>
      <div class="faq-answer">
        <p>Because the site’s still under construction, Einstein. Maybe if our creator stopped doom-scrolling and avoided public indecency near cement trucks, we’d finish it. Until then? Manifest patience.</p>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-question" aria-expanded="false">
        <span>When’s the full version dropping? ⏳</span>
        <span class="faq-arrow">▼</span>
      </button>
      <div class="faq-answer">
        <p>Whenever the creator stops philosophizing about cyberpunk’s survival and actually hits ‘publish.’ For now, enjoy the neon crumbs you get. It's functionally chaotic. 🌀</p>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-question" aria-expanded="false">
        <span>How do I navigate this maze? 🧭</span>
        <span class="faq-arrow">▼</span>
      </button>
      <div class="faq-answer">
        <p>Lost in the neon sauce? No worries.  \n- <strong>Socials?</strong> Click the contact tab → scroll → click again. Basic motor skills required.  \n- <strong>Site sections?</strong> Bottom left corner, hover over the hamburger icon like it owes you money. Click. Choose. Try not to smash your monitor. 🍔</p>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-question" aria-expanded="false">
        <span>Who the hell is dVlpr? 🧠</span>
        <span class="faq-arrow">▼</span>
      </button>
      <div class="faq-answer">
        <p>A cyber-goblin born of chaos. He hacked porn sites at 1, trolled Apple at 3, and summoned Skibidi Toilet into the multiverse. You’re welcome. Or not. 🤷‍♀️</p>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-question" aria-expanded="false">
        <span>Can I use your code? 📋</span>
        <span class="faq-arrow">▼</span>
      </button>
      <div class="faq-answer">
        <p>Most of it’s open source—check the project pages for the license. If you don’t give credit though, I will haunt your GitHub commits. 🙃</p>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-question" aria-expanded="false">
        <span>What’s hyprZona even about? 🌀</span>
        <span class="faq-arrow">▼</span>
      </button>
      <div class="faq-answer">
        <p>A digital madhouse churning out chaotic games, deranged stories, and bangers you didn’t ask for. Founded in 2024. Fueled by neon, trauma, and one man's vendetta against boring design.</p>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-question" aria-expanded="false">
        <span>How do I make this thing shut up? 🔇</span>
        <span class="faq-arrow">▼</span>
      </button>
      <div class="faq-answer">
        <p>Click the ✖ on the top right. Or stop interacting and I’ll peace out after a minute—like your will to live after opening Twitter. But let’s be honest, you’ll miss me. 😏</p>
      </div>
    </div>

  </div>
</div>

      <!-- Contact Tab -->
      <div class="tab-content" id="content-contact" role="tabpanel" aria-labelledby="tab-contact">
        <div class="content-section">
          <h3>💬 Talk Nerdy to Us</h3>
          <p>Got questions? Found a bug? Just want to chat about code? We're here for it!</p>

          <div class="contact-options">
  <a href="mailto:hyprZona.official@gmail.com" class="contact-option">
    <span class="contact-icon">📧</span>
    <div class="contact-details">
      <h4>Email</h4>
      <p>hyprZona.official@gmail.com</p>
      <small>Old-school? Slide into our inbox like it's 2003.</small>
    </div>
  </a>

  <a href="https://discord.gg/dDCmRRu8tY" class="contact-option" target="_blank" rel="noopener">
    <span class="contact-icon">🎮</span>
    <div class="contact-details">
      <h4>Discord</h4>
      <p>Join the cult—I mean, community</p>
      <small>Chats, sneak peeks, memes, and mild brain rot guaranteed.</small>
    </div>
  </a>

  <a href="https://github.com/hyprzona" class="contact-option" target="_blank" rel="noopener">
    <span class="contact-icon">🐙</span>
    <div class="contact-details">
      <h4>GitHub</h4>
      <p>hyprZona</p>
      <small>Where the code lives... and occasionally commits crimes.</small>
    </div>
  </a>

  <a href="https://hyprzona.itch.io" class="contact-option" target="_blank" rel="noopener">
    <span class="contact-icon">🎮</span>
    <div class="contact-details">
      <h4>Itch.io</h4>
      <p>hyprZona.itch.io</p>
      <small>Play the weird stuff. Regret nothing.</small>
    </div>
  </a>

  <a href="https://youtube.com/@hyprZona" class="contact-option" target="_blank" rel="noopener">
    <span class="contact-icon">📺</span>
    <div class="contact-details">
      <h4>YouTube</h4>
      <p>@hyprZona</p>
      <small>Watch us turn chaos into trailers, devlogs, and unfiltered brain fuel.</small>
    </div>
  </a>

  <a href="https://instagram.com/hyprZona" class="contact-option" target="_blank" rel="noopener">
    <span class="contact-icon">📸</span>
    <div class="contact-details">
      <h4>Instagram</h4>
      <p>@hyprZona</p>
      <small>Where pixels get pretty and vibes get aesthetic AF.</small>
    </div>
  </a>

  <a href="https://twitter.com/hyprZona" class="contact-option" target="_blank" rel="noopener">
    <span class="contact-icon">🐦</span>
    <div class="contact-details">
      <h4>X (Twitter)</h4>
      <p>@hyprZona</p>
      <small>Hot takes, cool updates, and occasional chaos in 280 characters or less.</small>
    </div>
  </a>

  <a href="https://bsky.app/profile/hyprzona.github.io" class="contact-option" target="_blank" rel="noopener">
    <span class="contact-icon">🌌</span>
    <div class="contact-details">
      <h4>Bluesky</h4>
      <p>@hyprzona.github.io</p>
      <small>The indie internet’s cooler, quieter cousin. We’re vibin’ there too.</small>
    </div>
  </a>

  <a href="https://reddit.com/r/hyprZsub" class="contact-option" target="_blank" rel="noopener">
    <span class="contact-icon">👽</span>
    <div class="contact-details">
      <h4>Reddit</h4>
      <p>r/hyprZsub</p>
      <small>For the lore junkies, chaos enjoyers, and conspiracy theorists alike.</small>
    </div>
  </a>
</div>

          <div class="bug-report">
            <h4>🐛 Found a Bug?</h4>
            <p>Please be as detailed as possible. Screenshots help! The more chaos you can describe, the better we can fix it.</p>
            <a href="https://github.com/hyprZona/hyprZona.github.io/issues" class="bug-report-btn" target="_blank" rel="noopener">
              Report Bug
            </a>
          </div>
        </div>
      </div>

      <!-- Easter Egg Tab -->
      <div class="tab-content" id="content-easter" role="tabpanel" aria-labelledby="tab-easter">
        <div class="content-section">
          <h3>🥚 Fun Stuff & Easter Eggs</h3>
          
          <div class="smarty-quote">
            <div class="quote-header">
              <span class="quote-icon">🧠</span>
              <h4>Smarty Quote of the Moment:</h4>
            </div>
            <blockquote id="random-quote">
              "If you're not embarrassed by your first website, you waited too long to launch."
            </blockquote>
            <button id="new-quote-btn" class="new-quote-btn">Get New Quote</button>
          </div>

          <div class="easter-eggs">
            <h4>🎊 Hidden Features</h4>
            <ul class="easter-list">
              <li>Try the Konami Code anywhere on the site 🎮</li>
              <li>Hold Shift while clicking project cards 🃏</li>
              <li>Type "neon" anywhere and see what happens ✨</li>
              <li>Check the browser console for secret messages 🕵️</li>
            </ul>
          </div>

          <div class="click-counter">
            <p id="click-message">Clicks on this widget: <span id="click-count">0</span></p>
            <small>Try clicking the hamburger button 10 times fast... 😈</small>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const button = document.getElementById('smarty-button');
    const panel = document.getElementById('smarty-panel');
    const overlay = document.getElementById('smarty-overlay');
    const closeBtn = document.getElementById('close-panel');
    const tabButtons = document.querySelectorAll('.tab-button');
    const faqButtons = document.querySelectorAll('.faq-question');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    // Main button click
    button.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleButtonClick();
    });

    // Close button
    closeBtn.addEventListener('click', () => this.closePanel());

    // Overlay click
    overlay.addEventListener('click', () => this.closePanel());

    // Tab navigation
    tabButtons.forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
    });

    // FAQ toggles
    faqButtons.forEach(btn => {
      btn.addEventListener('click', () => this.toggleFAQ(btn));
    });

    // New quote button
    newQuoteBtn.addEventListener('click', () => this.getNewQuote());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeydown(e));

    // Konami code easter egg
    this.initKonamiCode();

    // Neon typing easter egg
    this.initNeonTyping();

    // Add sound effects to interactions
    button.addEventListener('click', () => {
      this.playSound(this.isOpen ? 'close' : 'open');
    });

    tabButtons.forEach(tab => {
      tab.addEventListener('click', () => this.playSound('click'));
      tab.addEventListener('mouseenter', () => this.playSound('hover'));
    });

    faqButtons.forEach(btn => {
      btn.addEventListener('click', () => this.playSound('click'));
      btn.addEventListener('mouseenter', () => this.playSound('hover'));
    });

    // Add sound toggle option
    const soundToggle = document.createElement('button');
    soundToggle.className = 'sound-toggle';
    soundToggle.innerHTML = this.soundEnabled ? '🔊' : '🔇';
    soundToggle.title = 'Toggle sound effects';
    soundToggle.onclick = () => {
      this.soundEnabled = !this.soundEnabled;
      localStorage.setItem('smartyPantsSoundEnabled', this.soundEnabled);
      soundToggle.innerHTML = this.soundEnabled ? '🔊' : '🔇';
      this.playSound('click');
    };

    document.querySelector('.panel-header').appendChild(soundToggle);
  }

  playSound(soundName) {
    if (this.soundEnabled && this.sounds[soundName]) {
      const audio = new Audio(this.sounds[soundName]);
      audio.volume = soundName === 'hover' ? 0.2 : 0.4;
      audio.play().catch(error => {
        console.warn('Audio playback failed:', error);
      });
    }
  }

  handleButtonClick() {
    this.incrementClickCount();
    this.checkRapidClicks();
    
    if (!this.isOpen) {
      this.openPanel();
    } else {
      this.closePanel();
    }

    // Reset interaction timer on button click
    this.lastInteractionTime = Date.now();
  }

  openPanel() {
    const panel = document.getElementById('smarty-panel');
    const overlay = document.getElementById('smarty-overlay');
    const button = document.getElementById('smarty-button');

    this.isOpen = true;
    panel.classList.add('show');
    overlay.classList.add('show');
    panel.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    
    // Focus management
    setTimeout(() => {
      const firstTab = document.querySelector('.tab-button.active');
      if (firstTab) firstTab.focus();
    }, 300);

    // Clear pulse timer
    if (this.pulseTimer) {
      clearInterval(this.pulseTimer);
      this.pulseTimer = null;
    }

    // Start inactivity timer when panel opens
    this.startInactivityTimer();
  }

  closePanel() {
    const panel = document.getElementById('smarty-panel');
    const overlay = document.getElementById('smarty-overlay');
    const button = document.getElementById('smarty-button');

    this.isOpen = false;
    panel.classList.remove('show');
    overlay.classList.remove('show');
    panel.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    
    // Return focus to button
    button.focus();
    
    // Restart pulse timer
    this.startPulseTimer();

    // Clear inactivity timer when panel closes
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
  }

  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    
    document.getElementById(`tab-${tabName}`).classList.add('active');
    document.getElementById(`tab-${tabName}`).setAttribute('aria-selected', 'true');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    
    document.getElementById(`content-${tabName}`).classList.add('active');
    
    this.activeTab = tabName;
  }

  toggleFAQ(button) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const answer = button.nextElementSibling;
    
    button.setAttribute('aria-expanded', !isExpanded);
    
    if (isExpanded) {
      answer.classList.remove('expanded');
    } else {
      // Close other FAQ items
      document.querySelectorAll('.faq-question').forEach(btn => {
        if (btn !== button) {
          btn.setAttribute('aria-expanded', 'false');
          btn.nextElementSibling.classList.remove('expanded');
        }
      });
      
      answer.classList.add('expanded');
    }
  }

  incrementClickCount() {
    this.clickCount++;
    document.getElementById('click-count').textContent = this.clickCount;
    this.saveClickCount();
  }

  checkRapidClicks() {
    const now = Date.now();
    
    if (!this.rapidClicks) {
      this.rapidClicks = [];
    }

    // Add current click
    this.rapidClicks.push(now);
    
    // Remove clicks older than 3 seconds
    this.rapidClicks = this.rapidClicks.filter(time => now - time <= 3000);

    // Check if we have 10 or more clicks in the last 3 seconds
    if (this.rapidClicks.length >= 10) {
      this.triggerRapidClickEasterEgg();
      this.rapidClicks = []; // Reset after triggering
    }

    // Clear old timeout if it exists
    if (this.clickTimer) {
      clearTimeout(this.clickTimer);
    }

    // Set new timeout to clear clicks after 3 seconds
    this.clickTimer = setTimeout(() => {
      this.rapidClicks = [];
    }, 3000);
  }

  triggerRapidClickEasterEgg() {
    const messages = [
      "Stop spamming me, you absolute goblin! 😤",
      "Okay okay, I get it! You really want my attention! 🙄",
      "Are you trying to break me? Because this is how you break things... 💔",
      "I'm a help widget, not a stress ball! 😵‍💫",
      "Fine, you found the secret! Here's a cookie: 🍪 Now leave me alone!",
      "You have the patience of a caffeinated developer at 3 AM... 🫖"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    this.showTemporaryMessage(randomMessage);
  }

  showTemporaryMessage(message) {
    // Create temporary message overlay
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: #00ffff;
      padding: 20px;
      border-radius: 12px;
      border: 2px solid #00ffff;
      z-index: 10000;
      font-family: inherit;
      text-align: center;
      box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
      max-width: 300px;
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Animate in
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
    
    setTimeout(() => {
      messageDiv.style.transition = 'all 0.3s ease';
      messageDiv.style.opacity = '1';
      messageDiv.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      messageDiv.style.opacity = '0';
      messageDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
      setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
  }

  getNewQuote() {
    this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.quotes.length;
    const quoteElement = document.getElementById('random-quote');
    
    // Fade out
    quoteElement.style.opacity = '0.5';
    
    setTimeout(() => {
      quoteElement.textContent = this.quotes[this.currentQuoteIndex];
      quoteElement.style.opacity = '1';
    }, 200);
  }

  initializeQuote() {
    this.currentQuoteIndex = Math.floor(Math.random() * this.quotes.length);
    const quoteElement = document.getElementById('random-quote');
    if (quoteElement) {
      quoteElement.textContent = this.quotes[this.currentQuoteIndex];
    }
  }

  startPulseTimer() {
    // Pulse every 15 seconds when closed
    this.pulseTimer = setInterval(() => {
      if (!this.isOpen) {
        const button = document.getElementById('smarty-button');
        button.classList.add('pulse');
        
        // Remove pulse class after animation
        setTimeout(() => {
          button.classList.remove('pulse');
        }, 2000);
      }
    }, 15000);
  }

  setupInactivityTracking() {
    // Track user interactions
    const panel = document.getElementById('smarty-panel');
    
    const resetInactivityTimer = () => {
      this.lastInteractionTime = Date.now();
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer);
      }
      this.startInactivityTimer();
    };

    // Add interaction listeners
    panel.addEventListener('mousemove', resetInactivityTimer);
    panel.addEventListener('click', resetInactivityTimer);
    panel.addEventListener('scroll', resetInactivityTimer);
    panel.addEventListener('keydown', resetInactivityTimer);

    this.startInactivityTimer();
  }

  startInactivityTimer() {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }

    this.inactivityTimer = setTimeout(() => {
      if (this.isOpen) {
        this.closePanel();
      }
    }, 30000); // 30 seconds
  }

  handleKeydown(e) {
    if (!this.isOpen) return;

    switch (e.key) {
      case 'Escape':
        this.closePanel();
        break;
      case 'Tab':
        // Handle tab navigation within panel
        this.handleTabNavigation(e);
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        if (e.target.classList.contains('tab-button')) {
          this.navigateTabs(e.key === 'ArrowLeft' ? -1 : 1);
          e.preventDefault();
        }
        break;
    }
  }

  handleTabNavigation(e) {
    const panel = document.getElementById('smarty-panel');
    const focusableElements = panel.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const currentIndex = Array.prototype.indexOf.call(focusableElements, e.target);
    
    if (e.shiftKey && currentIndex > 0) {
      focusableElements[currentIndex - 1].focus();
    } else if (!e.shiftKey && currentIndex < focusableElements.length - 1) {
      focusableElements[currentIndex + 1].focus();
    } else if (!e.shiftKey && currentIndex === focusableElements.length - 1) {
      firstElement.focus();
    } else if (e.shiftKey && currentIndex === 0) {
      lastElement.focus();
    }
  }

  navigateTabs(direction) {
    const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
    const currentIndex = tabButtons.findIndex(tab => tab.classList.contains('active'));
    let newIndex = currentIndex + direction;

    // Handle wrap-around
    if (newIndex >= tabButtons.length) newIndex = 0;
    if (newIndex < 0) newIndex = tabButtons.length - 1;

    // Switch to the new tab
    const newTab = tabButtons[newIndex];
    if (newTab) {
        this.switchTab(newTab.dataset.tab);
        newTab.focus();
    }
  }

  initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                this.triggerKonamiEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

triggerKonamiEasterEgg() {
    // Create neon explosion effect
    const explosion = document.createElement('div');
    explosion.className = 'konami-explosion';
    document.body.appendChild(explosion);

    // Show secret message
    this.showTemporaryMessage('🎮 KONAMI CODE ACTIVATED! You are a true gaming nerd! 🎯');

    // Add some visual chaos
    document.body.classList.add('konami-active');
    setTimeout(() => {
        document.body.classList.remove('konami-active');
        explosion.remove();
    }, 3000);
}

saveClickCount() {
    try {
        localStorage.setItem('smartyPantsClicks', this.clickCount.toString());
    } catch (error) {
        console.warn('Failed to save click count:', error);
    }
}

loadClickCount() {
    try {
        const savedCount = localStorage.getItem('smartyPantsClicks');
        if (savedCount) {
            this.clickCount = parseInt(savedCount, 0);
            document.getElementById('click-count').textContent = this.clickCount;
        }
    } catch (error) {
        console.warn('Failed to load click count:', error);
    }
}

initNeonTyping() {
    let typedWord = '';
    let typingTimer;

    document.addEventListener('keydown', (e) => {
        // Only track alphanumeric keys
        if (e.key.length === 1 && /^[a-zA-Z0-9]$/.test(e.key)) {
            clearTimeout(typingTimer);
            typedWord += e.key.toLowerCase();

            // Check for 'neon' keyword
            if (typedWord.includes('neon')) {
                this.triggerNeonEasterEgg();
                typedWord = '';
            }

            // Reset after 1 second of no typing
            typingTimer = setTimeout(() => {
                typedWord = '';
            }, 1000);
        }
    });
}

triggerNeonEasterEgg() {
    // Add temporary neon effect to all text
    document.body.classList.add('neon-mode');
    
    this.showTemporaryMessage('✨ NEON MODE ACTIVATED! Everything is better with neon! 🌈');
    
    setTimeout(() => {
        document.body.classList.remove('neon-mode');
    }, 5000);
}

addConsoleEasterEggs() {
    const styles = [
        'color: #00ffff',
        'font-size: 20px',
        'font-weight: bold',
        'text-shadow: 2px 2px 4px rgba(0,255,255,0.5)',
        'padding: 20px'
    ].join(';');

    console.log('%c👋 Well hello there, curious developer!', styles);
    console.log('%c🕵️ Since you\'re here, try these secret commands:', 'color: #ff073a');
    console.log(
        '%c⌨️ window.hackTheMatrix()',
        'color: #00ffff',
        '- For a special surprise'
    );

    // Add some fun console commands
    window.hackTheMatrix = () => {
        console.log('%c🤖 SYSTEM BREACH DETECTED...', 'color: #ff073a; font-size: 20px;');
        document.body.classList.add('matrix-mode');
        setTimeout(() => {
            document.body.classList.remove('matrix-mode');
        }, 5000);
    };
}
}

// Initialize the widget when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.smartyPants = new SmartyPantsWidget();
});