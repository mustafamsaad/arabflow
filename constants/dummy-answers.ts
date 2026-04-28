export interface DummyAnswer {
  _id: string;
  author: { _id: string; name: string; image?: string };
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  content: string;
}

export const DUMMY_ANSWERS: DummyAnswer[] = [
  {
    _id: "ans-1",
    author: { _id: "user-philip", name: "Philip Martin" },
    createdAt: new Date("2022-08-06T21:01:00Z"),
    upvotes: 12,
    downvotes: 4,
    content: `I think what you want to do is probably not to attach the foreach function to only the one array you have here, but to make it work for all arrays.

To do that, you must edit the Array prototype (something that some people have very strong opinions about, because you can not protect against potential future namespace collisions - but other people find extremely useful).

\`\`\`js
if (
  partsLibBigSearch
    .column($(this).parent().index() + ":visible")
    .search() !== this.value
) {
  partsLibBigSearch
    .column($(this).parent().index() + ":visible")
    .search(this.value)
    .draw();
}
\`\`\`

*N.B. to avoid conflict with existing forEach functions ([MDN](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach)) I have named the function \`myForEach\` which I expect to be safe from conflict.*`,
  },
  {
    _id: "ans-2",
    author: { _id: "user-taylor", name: "Taylor Hernandez" },
    createdAt: new Date("2022-08-06T21:01:00Z"),
    upvotes: 12,
    downvotes: 4,
    content: `You need to add the \`forEach\` method to the prototype of \`Array\`:

\`\`\`js
console.log("Search result =>");
partsLibBigSearch.rows({ search: "applied" }).count();
enabledExportCount();

if (partsLibBigSearch.rows({ search: "applied" }).count() == enabledExportCount) {
  $("#toolbarExportCol")
    .find('button[id="exportButton"]')
    .attr("disabled", false);
} else {
  if (partsLibBigSearch.rows({ search: "applied" }).count() > enabledExportCount) {
    // ...
  }
}
\`\`\``,
  },
];
