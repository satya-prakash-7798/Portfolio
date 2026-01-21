# Portfolio Website Setup & Deployment Guidelines

## 1. Information Required to Build UI/UX

To make your portfolio truly "yours" and impactful, you'll need to gather the following assets and information:

### **Personal Assets**
*   **Bio/Introduction**: A compelling 2-3 sentence summary of who you are and what you do.
*   **Resume/CV**: A comprehensive document listing your experience, education, and skills.
*   **Professional Photo**: A high-quality headshot or a creative avatar.
*   **Contact Info**: Your professional email, LinkedIn profile, GitHub, etc.

### **Project Content** (For each project)
*   **Title**: Clear and descriptive project name.
*   **Description**: What was the problem? How did you solve it? What technologies did you use?
*   **Screenshots/Media**: High-resolution images or videos of the project in action.
*   **Tech Stack**: List of languages, frameworks, and tools used (e.g., React, Node.js, Python).
*   **Links**: URLs to the live demo and the GitHub repository.

### **Design Preferences**
*   **Color Palette**: Although we've started with a default premium theme, having specific brand colors helps.
*   **Typography**: Preferred fonts if you have any (we are using Outfit and Space Grotesk).

---

## 2. Deployment Instructions (GitHub Pages)

We can host this static website for **FREE** using **GitHub Pages**.

### **Step 1: Create a GitHub Repository**
1.  Log in to your [GitHub account](https://github.com/).
2.  Click the **+** icon in the top-right corner and select **New repository**.
3.  Name your repository `username.github.io` (replace `username` with your actual GitHub username). 
    *   *Note: If you name it exactly `username.github.io`, your website URL will be exactly `https://username.github.io`. If you name it something else like `portfolio`, the URL will be `https://username.github.io/portfolio`.*
4.  Make it **Public**.
5.  Click **Create repository**.

### **Step 2: Push Code to GitHub**
(You need Git installed on your computer. If not, download it from git-scm.com)

Open your terminal or command prompt in your project folder (`d:\Portfolio`) and run these commands:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Portfolio website"

# Link to your new GitHub repository
# Replace USERNAME with your GitHub username and REPO_NAME with your repository name
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Push the code
git push -u origin main
```

*(Note: You might need to use `master` instead of `main` depending on your git version, but `main` is standard now).*

### **Step 3: Activate GitHub Pages**
1.  Go to your repository page on GitHub.
2.  Click on **Settings** (tab).
3.  On the left sidebar, click **Pages**.
4.  Under **Source**, select **Deploy from a branch**.
5.  Under **Branch**, select `main` (or `master`) and `/ (root)`.
6.  Click **Save**.

Wait a few minutes (usually 1-5 mins), and your site will be live at the URL provided on that page!
