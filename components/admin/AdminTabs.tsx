import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllProducts from "./AllProducts";
import AllCollections from "./AllCollections";

function AdminTabs() {
  return (
    <div>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Products</TabsTrigger>
          <TabsTrigger value="password">Collections</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AllProducts />
        </TabsContent>
        <TabsContent value="password">
          <AllCollections />
        </TabsContent>
        <TabsContent value="orders">{/* <Collections /> */}</TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminTabs;
