import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import LandingPage from './pages/landing-page';
import PricingPage from './pages/pricing-page';
import ContactPage from './pages/contact-page';
import DashboardDemo from './pages/dashboard-demo';
import FeaturesPage from './pages/features-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import ProtectedRoute from './components/ProtectedRoute';
import FirebaseDemo from './pages/firebase-demo';
import AdminPanel from './pages/admin-panel';
import AdminLoginPage from './pages/admin-login';
import UserReportPage from './pages/user-report';
import DashboardPage from './pages/dashboard';
import ChatbotPage from './pages/chatbot';
import OverviewView from './pages/dashboard/components/OverviewView';
import TransactionsView from './pages/dashboard/components/TransactionsView';
import CreditScoreView from './pages/dashboard/components/CreditScoreView';
import ReportsView from './pages/dashboard/components/ReportsView';
import CommunityChat from './pages/community-chat';
import AdminRoute from './components/AdminRoute';
import BankStaffLoginPage from './pages/bank-staff-login';
import PrivateChatList from './pages/dashboard/components/PrivateChatList'; // Import new component
import PrivateChatWindow from './pages/dashboard/components/PrivateChatWindow'; // Import new component
import UserProfile from './pages/dashboard/components/UserProfile'; // Import new component

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/pricing-page" element={<PricingPage />} />
        <Route path="/contact-page" element={<ContactPage />} />
        <Route path="/dashboard-demo" element={<DashboardDemo />} />
        <Route path="/features-page" element={<FeaturesPage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path="/firebase-demo" element={<FirebaseDemo />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} >
          <Route index element={<OverviewView />} /> {/* Default child route for /dashboard */}
          <Route path="transactions" element={<TransactionsView />} />
          <Route path="credit-score" element={<CreditScoreView />} />
          <Route path="reports" element={<ReportsView />} />
          <Route path="chatbot" element={<ChatbotPage />} />
          <Route path="community-chat" element={<CommunityChat />} />
          <Route path="private-chat/:chatId" element={<PrivateChatWindow />} /> {/* New route for individual private chats */}
          <Route path="user-profile" element={<UserProfile />} /> {/* New route for current user's profile / account settings */}
          <Route path="user-profile/:userId" element={<UserProfile />} /> {/* Existing route for other user profiles */}
        </Route>
        <Route path="/dashboard-demo/*" element={<DashboardDemo />} /> {/* Catch all for dashboard sub-routes */}
        <Route path="/admin-login" element={<BankStaffLoginPage />} />
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
        <Route path="/admin/user/:userId" element={<AdminRoute><UserReportPage /></AdminRoute>} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;