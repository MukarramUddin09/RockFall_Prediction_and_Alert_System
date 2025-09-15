import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Activity,
  Battery,
  MapPin,
  Settings,
  Layers,
  Maximize,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock sensor node data - ready for backend integration
const mockNodes = [
  {
    id: "Node-01",
    position: [47.6062, -122.3321] as LatLngExpression,
    status: "safe",
    vibration: 23,
    tilt: 2.1,
    battery: 89,
    rssi: -67,
    rockType: "Limestone",
    lastUpdate: "2 min ago",
    slopeAngle: 45,
  },
  {
    id: "Node-07",
    position: [47.6082, -122.3341] as LatLngExpression,
    status: "critical",
    vibration: 156,
    tilt: 12.3,
    battery: 67,
    rssi: -72,
    rockType: "Sandstone",
    lastUpdate: "1 min ago",
    slopeAngle: 52,
  },
  {
    id: "Node-12",
    position: [47.6052, -122.3301] as LatLngExpression,
    status: "warning",
    vibration: 89,
    tilt: 8.7,
    battery: 82,
    rssi: -69,
    rockType: "Shale",
    lastUpdate: "3 min ago",
    slopeAngle: 38,
  },
  {
    id: "Node-15",
    position: [47.6072, -122.3361] as LatLngExpression,
    status: "safe",
    vibration: 45,
    tilt: 4.2,
    battery: 91,
    rssi: -64,
    rockType: "Granite",
    lastUpdate: "1 min ago",
    slopeAngle: 41,
  },
  {
    id: "Node-18",
    position: [47.6092, -122.3311] as LatLngExpression,
    status: "warning",
    vibration: 67,
    tilt: 6.8,
    battery: 34,
    rssi: -78,
    rockType: "Limestone",
    lastUpdate: "5 min ago",
    slopeAngle: 47,
  },
];

// Custom marker icons for different statuses
const createCustomIcon = (status: string) => {
  const colors = {
    safe: "#10b981",
    warning: "#f59e0b",
    critical: "#ef4444",
    offline: "#6b7280",
  };

  return new Icon({
    iconUrl: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="${colors[status as keyof typeof colors]}" stroke="white" stroke-width="2"/>
        <circle cx="12" cy="12" r="6" fill="white" opacity="0.8"/>
      </svg>
    `)}`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

export default function MapView() {
  const [selectedNode, setSelectedNode] = useState<(typeof mockNodes)[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "status-critical";
      case "warning":
        return "status-warning";
      case "safe":
        return "status-safe";
      default:
        return "status-offline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "critical":
        return "Critical";
      case "warning":
        return "Warning";
      case "safe":
        return "Normal";
      default:
        return "Offline";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Network Map View
          </h1>
          <p className="text-muted-foreground">
            Interactive monitoring of sensor node locations and status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Layers className="w-4 h-4 mr-2" />
            Map Layers
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Map and Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2"
        >
          <Card className="monitoring-card h-[600px]">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Sensor Network Map
                </div>
                <Button variant="ghost" size="sm">
                  <Maximize className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-80px)]">
              <div className="w-full h-full rounded-b-lg overflow-hidden">
                <MapContainer
                  center={[47.6062, -122.3321]}
                  zoom={15}
                  className="w-full h-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {mockNodes.map((node) => (
                    <Marker
                      key={node.id}
                      position={node.position}
                      icon={createCustomIcon(node.status)}
                      eventHandlers={{
                        click: () => setSelectedNode(node),
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold">{node.id}</h3>
                          <div className="space-y-1 text-sm">
                            <div>Status: {getStatusText(node.status)}</div>
                            <div>Vibration: {node.vibration}μg</div>
                            <div>Tilt: {node.tilt}°</div>
                            <div>Battery: {node.battery}%</div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Node Details Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Status Legend */}
          <Card className="monitoring-card">
            <CardHeader>
              <CardTitle className="text-lg">Status Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-status-safe rounded-full" />
                <span className="text-sm">Normal Operation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-status-warning rounded-full" />
                <span className="text-sm">Warning Level</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-status-critical rounded-full" />
                <span className="text-sm">Critical Alert</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-status-offline rounded-full" />
                <span className="text-sm">Offline/No Signal</span>
              </div>
            </CardContent>
          </Card>

          {/* Selected Node Details */}
          {selectedNode ? (
            <Card className="monitoring-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedNode.id}</span>
                  <Badge className={getStatusColor(selectedNode.status)}>
                    {getStatusText(selectedNode.status)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="current" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="current">Current</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>
                  <TabsContent value="current" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-chart-primary">
                          {selectedNode.vibration}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Vibration (μg)
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-chart-secondary">
                          {selectedNode.tilt}°
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Tilt Angle
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Battery className="w-4 h-4" />
                          <span className="text-sm">Battery</span>
                        </div>
                        <span className="text-sm font-medium">
                          {selectedNode.battery}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          <span className="text-sm">Signal</span>
                        </div>
                        <span className="text-sm font-medium">
                          {selectedNode.rssi} dBm
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium">Rock Type</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedNode.rockType}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Slope Angle</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedNode.slopeAngle}°
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Last Update</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedNode.lastUpdate}
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      View Historical Data
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="monitoring-card">
              <CardHeader>
                <CardTitle>Node Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Click on a node marker to view details</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="monitoring-card">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                View All Alerts
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Activity className="w-4 h-4 mr-2" />
                Live Data Feed
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Node Configuration
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}