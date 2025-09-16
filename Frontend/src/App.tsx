// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Layout } from "./components/Layout";
// import Dashboard from "./pages/Dashboard";
// import MapView from "./pages/MapView";
// import LiveData from "./pages/LiveData";
// import Predictions from "./pages/Predictions";
// import Trends from "./pages/Trends";
// import Events from "./pages/Events";
// import Health from "./pages/Health";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route index element={<Dashboard />} />
//             <Route path="map" element={<MapView />} />
//             <Route path="live-data" element={<LiveData />} />
//             <Route path="predictions" element={<Predictions />} />
//             <Route path="trends" element={<Trends />} />
//             <Route path="events" element={<Events />} />
//             <Route path="health" element={<Health />} />
//           </Route>
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


// new app.tsx including signup and login and authcntex.tsx

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapView";
import LiveData from "./pages/LiveData";
import Predictions from "./pages/Predictions";
import Trends from "./pages/Trends";
import Events from "./pages/Events";
import Health from "./pages/Health";
import NotFound from "./pages/NotFound";

// newly added
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={< ForgotPassword/>}  />

          {/* Main layout with nested routes */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="map" element={<MapView />} />
            <Route path="live-data" element={<LiveData />} />
            <Route path="predictions" element={<Predictions />} />
            <Route path="trends" element={<Trends />} />
            <Route path="events" element={<Events />} />
            <Route path="health" element={<Health />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
