# Project Approvals - Ecopetrol

A comprehensive web application for project creation and management with approval workflows, built with React and TailwindCSS.

## 🚀 Features

### Project Creation
- **Multi-step form** with dynamic feature selection
- **Feature-based approval workflows**:
  - 🤖 **Artificial Intelligence**: Azure AI Foundry, OpenAI, Microsoft Copilot
  - 📊 **Data**: Dataset access and permissions
  - 📈 **Analytics**: Databricks, Power BI workspaces
  - ⚡ **Power Platform**: Environments, licenses, connectors
- **Development type selection**: Self-development vs Third-party development
- **Infrastructure access requests** for self-development projects

### Project Management
- **Dashboard** with project statistics and overview
- **Project states**: Draft, Created, Approved, In Progress, Completed
- **Advanced filtering** by status, features, and search terms
- **Project detail views** with comprehensive information
- **Status management** and approval workflows

### User Experience
- **Modern UI** with Ecopetrol brand colors (green, yellow, white)
- **Responsive design** for all device sizes
- **Dark mode toggle**
- **Real-time notifications**
- **Intuitive navigation** with sidebar

### Approval System
- **Role-based approvals** based on project features
- **Approval tracking** and status updates
- **Workflow management** from creation to completion

## 🛠️ Technology Stack

- **Frontend**: React 18
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Heroicons
- **Date Handling**: date-fns
- **PDF Export**: jsPDF (ready for implementation)
- **Build Tool**: Create React App

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Sidebar.jsx          # Navigation sidebar
│   │   └── Header.jsx           # Top header with notifications
│   ├── Dashboard/
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── ProjectStats.jsx     # Project statistics cards
│   │   └── ProjectsTable.jsx    # Projects table with filters
│   ├── ProjectForm/
│   │   ├── CreateProjectForm.jsx # Main project creation form
│   │   ├── FeatureSelection.jsx  # Feature selection component
│   │   ├── DevelopmentTypeSelection.jsx # Development type selection
│   │   └── FeatureForms.jsx     # Dynamic feature-specific forms
│   ├── ProjectDetail/
│   │   └── ProjectDetail.jsx    # Project detail view
│   ├── Projects/
│   │   └── ProjectsList.jsx     # User's projects list
│   ├── Approvals/
│   │   └── ApprovalsList.jsx    # Approval management
│   └── Settings/
│       └── Settings.jsx         # User settings and preferences
├── store/
│   └── index.js                 # Zustand store configuration
├── App.jsx                      # Main application component
└── index.js                     # Application entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: #00662F (Ecopetrol Green)
- **Secondary**: #FFD100 (Ecopetrol Yellow)
- **Background**: #F9FAF7 (Light Off-White)
- **Accent**: Soft Blue/Turquoise for contrast

### UI Components
- **Cards**: Soft shadows, rounded corners
- **Buttons**: Consistent styling with hover effects
- **Forms**: Clean, accessible input fields
- **Tables**: Sortable, filterable data tables
- **Navigation**: Intuitive sidebar with active states

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ProjectApprovals
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📱 Usage

### Creating a Project
1. Navigate to "Create Project" from the header
2. Fill in basic project information (name, scope, objective)
3. Select project features (AI, Data, Analytics, Power Platform)
4. Choose development type (Self-development or Third-party)
5. Complete feature-specific resource requests
6. Submit for approval

### Managing Projects
- **Dashboard**: Overview of all projects and statistics
- **My Projects**: View and manage your own projects
- **Approvals**: Review and approve pending projects
- **Settings**: Customize your preferences and notifications

### Approval Workflow
1. **Draft**: Project is being created
2. **Created**: Submitted for approval
3. **Approved**: Approved and ready for development
4. **In Progress**: Development has started
5. **Completed**: Project finished

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_api_url_here
REACT_APP_APP_NAME=Project Approvals
```

### Customization
- **Colors**: Modify `tailwind.config.js` for brand colors
- **Features**: Add new project features in the store
- **Approval Roles**: Customize approval workflows in components

## 📊 Data Structure

### Project Object
```javascript
{
  id: string,
  name: string,
  scope: string,
  objective: string,
  owner: string,
  createdAt: string,
  features: string[],
  developmentType: string,
  state: string,
  aiResources: object,
  dataAccess: object,
  analyticsResources: object,
  powerPlatformResources: object,
  infrastructureAccess: object,
  approvals: array
}
```

## 🚧 Future Enhancements

- [ ] **PDF Export**: Implement project report generation
- [ ] **Email Notifications**: Send approval requests via email
- [ ] **Advanced Analytics**: Project performance metrics
- [ ] **User Management**: Role-based access control
- [ ] **API Integration**: Connect to backend services
- [ ] **Mobile App**: React Native companion app

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software developed for Ecopetrol. All rights reserved.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🙏 Acknowledgments

- Ecopetrol for the project requirements and brand guidelines
- React and TailwindCSS communities for excellent tooling
- Heroicons for beautiful iconography

---

**Built with ❤️ for Ecopetrol**
