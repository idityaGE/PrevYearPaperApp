import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../lib/config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Query {
  id: number;
  message: string;
  isResponded: boolean;
  user: {
    name: string;
    email: string;
  };
  createdAt?: string;
}

function PendingQueries() {
  const [allQueries, setAllQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/admin/queries`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setAllQueries(response.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch queries");
      } finally {
        setLoading(false);
      }
    };
    fetchQueries();
  }, []);

  const handleRespond = async (id: number) => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/admin/resolve-query/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const updated = allQueries.map((query) =>
        query.id === id ? { ...query, isResponded: true } : query
      );
      setAllQueries(updated);
      toast.success("Query marked as resolved");
    } catch (error) {
      console.error(error);
      toast.error("Failed to resolve query");
    }
  };

  const getInitials = (name: string) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pending Queries</h2>
        <div className="text-muted-foreground">
          {allQueries.length} {allQueries.length === 1 ? "query" : "queries"}{" "}
          found
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-xl border border-border bg-muted/10 animate-pulse"
            />
          ))}
        </div>
      ) : allQueries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-lg bg-muted/10">
          <MessageSquare className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-muted-foreground">
            No pending queries found
          </p>
          <p className="text-sm text-muted-foreground/80 mt-1">
            All user queries have been resolved.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allQueries.map((q) => (
            <Card
              key={q.id}
              className="group flex flex-col overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {getInitials(q.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <CardTitle className="text-base font-semibold leading-none">
                        {q.user.name || "Unknown User"}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {q.user.email}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={q.isResponded ? "default" : "outline"}
                    className={
                      q.isResponded
                        ? "bg-green-500/15 text-green-600 hover:bg-green-500/25 border-green-500/20"
                        : "bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25 border-yellow-500/20"
                    }
                  >
                    {q.isResponded ? "Resolved" : "Pending"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <div className="rounded-lg bg-muted/30 p-4 border border-border/50 h-full">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {q.message}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex items-center justify-between border-t border-border/50 bg-muted/10 px-6 py-3 mt-auto">
                <span className="text-xs text-muted-foreground">
                  {q.createdAt
                    ? new Date(q.createdAt).toLocaleDateString()
                    : "Date not available"}
                </span>
                <Button
                  onClick={() => handleRespond(q.id)}
                  disabled={q.isResponded}
                  variant={q.isResponded ? "ghost" : "default"}
                  size="sm"
                  className={
                    q.isResponded
                      ? "text-muted-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }
                >
                  {q.isResponded ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Resolved
                    </>
                  ) : (
                    "Mark as Resolved"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingQueries;
