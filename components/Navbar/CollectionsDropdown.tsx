"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Prisma } from "@/generated/prisma";
import Link from "next/link";
type collectionLinks = Prisma.CollectionLinkGetPayload<{
  include: {
    collection: true;
  };
}>;
function CollectionsDropdown({
  collectionLinks,
}: {
  collectionLinks: collectionLinks[];
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-black text-white text-xs hover:bg-black hover:text-white">
            COLLECTIONS
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                {collectionLinks.map((link) => {
                  return (
                    <NavigationMenuLink asChild key={link.id}>
                      <Link
                        href={`/collections/${link.collection.slug}`}
                        className="text-xs capitalize">
                        {link.collectionName}
                      </Link>
                    </NavigationMenuLink>
                  );
                })}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default CollectionsDropdown;
