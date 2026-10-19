
/*
  EDIT YOUR ACADEMIC WORKS IN THIS FILE.

  Put your files in the matching folders, then add their paths below.
  Example:
  { name: "Quiz 1", path: "files/quiz/quiz-1.pdf", type: "PDF" }

  No database is used.
*/

const categories = [
    {
        id: "quiz",
        title: "Quiz",
        icon: "📝",
        description: "Quizzes and short assessments.",
        files: [
            // { name: "Quiz 1", path: "files/quiz/quiz-1.pdf", type: "PDF" }
        ]
    },
    {
        id: "long-quiz",
        title: "Long Quiz",
        icon: "📚",
        description: "Long quizzes and assessments.",
        files: [
            // { name: "Long Quiz 1", path: "files/long-quiz/long-quiz-1.pdf", type: "PDF" }
        ]
    },
    {
        id: "midterms",
        title: "Midterms",
        icon: "📖",
        description: "Midterm examinations and files.",
        files: [
            // { name: "Midterm Exam", path: "files/midterms/midterm.pdf", type: "PDF" }
        ]
    },
    {
        id: "finals",
        title: "Finals",
        icon: "🎓",
        description: "Final examinations and requirements.",
        files: [
            // { name: "Final Exam", path: "files/finals/final-exam.pdf", type: "PDF" }
        ]
    },
    {
        id: "activities",
        title: "Activities",
        icon: "✏️",
        description: "Classroom activities and exercises.",
        files: [
            // { name: "Activity 1", path: "files/activities/activity-1.jpg", type: "Image" }
        ]
    },
    {
        id: "projects",
        title: "Projects",
        icon: "💡",
        description: "Projects and completed outputs.",
        files: [
            // { name: "Project 1", path: "files/projects/project-1.pdf", type: "PDF" }
        ]
    }
];

const categoryList = document.getElementById("category-list");
const fileList = document.getElementById("file-list");
const selectedTitle = document.getElementById("selected-title");
const fileCount = document.getElementById("file-count");

let selectedCategory = "quiz";

function renderCategories() {
    categoryList.innerHTML = "";

    categories.forEach((category) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "category-card";
        button.classList.toggle("active", category.id === selectedCategory);
        button.setAttribute(
            "aria-pressed",
            String(category.id === selectedCategory)
        );

        const icon = document.createElement("span");
        icon.className = "category-icon";
        icon.textContent = category.icon;

        const title = document.createElement("h3");
        title.textContent = category.title;

        const description = document.createElement("p");
        description.textContent = category.description;

        button.append(icon, title, description);
        button.addEventListener("click", () => {
            selectedCategory = category.id;
            renderCategories();
            renderFiles();
        });

        categoryList.appendChild(button);
    });
}

function renderFiles() {
    const category = categories.find(
        (item) => item.id === selectedCategory
    );

    if (!category) return;

    selectedTitle.textContent = category.title;
    fileCount.textContent = `${category.files.length} item${
        category.files.length === 1 ? "" : "s"
    }`;

    fileList.innerHTML = "";

    if (category.files.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.textContent =
            "No files have been added to this category yet.";
        fileList.appendChild(empty);
        return;
    }

    category.files.forEach((file) => {
        const card = document.createElement("article");
        card.className = "file-card";

        const type = document.createElement("span");
        type.className = "file-type";
        type.textContent = file.type || "FILE";

        const title = document.createElement("h4");
        title.textContent = file.name;

        const actions = document.createElement("div");
        actions.className = "file-actions";

        const viewLink = document.createElement("a");
        viewLink.className = "file-button";
        viewLink.href = file.path;
        viewLink.target = "_blank";
        viewLink.rel = "noopener noreferrer";
        viewLink.textContent = "View";

        const downloadLink = document.createElement("a");
        downloadLink.className = "file-button secondary";
        downloadLink.href = file.path;
        downloadLink.setAttribute("download", "");
        downloadLink.textContent = "Download";

        actions.append(viewLink, downloadLink);
        card.append(type, title, actions);
        fileList.appendChild(card);
    });
}

document.getElementById("year").textContent = new Date().getFullYear();

renderCategories();
renderFiles();

